import { Stack, StackProps } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import {
  INDEX_GSI1,
  INDEX_GSI2,
  INDEX_GSI3,
  INDEX_GSI4,
  INDEX_GSI5,
  INDEX_GSI6,
  TABLE_NAME,
} from "../constants";

export class SproutOpsTableStack extends Stack {
  sproutOpsTable: Table;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new Table(this, "SproutOpsTable", {
      tableName: TABLE_NAME,
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.sproutOpsTable = table;

    table.addGlobalSecondaryIndex({
      indexName: INDEX_GSI1,
      partitionKey: { name: "GSI1PK", type: AttributeType.STRING },
      sortKey: { name: "GSI1SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: INDEX_GSI2,
      partitionKey: { name: "GSI2PK", type: AttributeType.STRING },
      sortKey: { name: "GSI2SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: INDEX_GSI3,
      partitionKey: { name: "GSI3PK", type: AttributeType.STRING },
      sortKey: { name: "GSI3SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: INDEX_GSI4,
      partitionKey: { name: "GSI4PK", type: AttributeType.STRING },
      sortKey: { name: "GSI4SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: INDEX_GSI5,
      partitionKey: { name: "GSI5PK", type: AttributeType.STRING },
      sortKey: { name: "GSI5SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: INDEX_GSI6,
      partitionKey: { name: "GSI6PK", type: AttributeType.STRING },
      sortKey: { name: "GSI6SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    const lambda = new NodejsFunction(this, "MockDataGenerator", {
      functionName: "sproutops-dev-generate-mock-data-lambda",
      entry: "resources/lambdas/generate-mock-data/app.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_LATEST,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    table.grantReadWriteData(lambda);
  }
}
