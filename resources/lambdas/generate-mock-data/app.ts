import { Handler } from "aws-cdk-lib/aws-lambda";
import { generateMockData } from "./generator";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
  BatchWriteCommandInput,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.TABLE_NAME as string;
const MAX_BATCH_SIZE = 25;

const ddb = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddb);

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export const handler: Handler = async () => {
  try {
    let lastKey: Record<string, any> | undefined;
    const allKeys: { PK: string; SK: string }[] = [];

    do {
      const scanResp = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAME,
          ProjectionExpression: "PK, SK",
          ExclusiveStartKey: lastKey,
        })
      );

      if (scanResp.Items) {
        for (const it of scanResp.Items) {
          allKeys.push({ PK: it.PK as string, SK: it.SK as string });
        }
      }
      lastKey = scanResp.LastEvaluatedKey;
    } while (lastKey);

    for (const chunk of chunkArray(allKeys, MAX_BATCH_SIZE)) {
      const deleteRequests = chunk.map((key) => ({
        DeleteRequest: { Key: { PK: key.PK, SK: key.SK } },
      }));
      const delParams: BatchWriteCommandInput = {
        RequestItems: { [TABLE_NAME]: deleteRequests },
      };
      await docClient.send(new BatchWriteCommand(delParams));
    }

    const items = generateMockData();

    for (const batch of chunkArray(items, MAX_BATCH_SIZE)) {
      const params: BatchWriteCommandInput = {
        RequestItems: {
          [TABLE_NAME]: batch.map((item) => ({ PutRequest: { Item: item } })),
        },
      };

      const cmd = new BatchWriteCommand(params);
      const res = await docClient.send(cmd);

      if (res.UnprocessedItems && Object.keys(res.UnprocessedItems).length) {
        await docClient.send(
          new BatchWriteCommand({ RequestItems: res.UnprocessedItems })
        );
      }
    }

    return {
      statusCode: 200,
      body: `Wrote ${items.length} items to ${TABLE_NAME}`,
    };
  } catch (error) {
    console.error("Error writing mock data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: (error as Error).message }),
    };
  }
};
