import { Stack, StackProps } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class SproutOpsTableStack extends Stack {
  sproutOpsTable: Table;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new Table(this, "SproutOpsTable", {
      tableName: "SproutOps",
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.sproutOpsTable = table;

    table.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "GSI1PK", type: AttributeType.STRING },
      sortKey: { name: "GSI1SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: "GSI2",
      partitionKey: { name: "GSI2PK", type: AttributeType.STRING },
      sortKey: { name: "GSI2SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: "GSI3",
      partitionKey: { name: "GSI3PK", type: AttributeType.STRING },
      sortKey: { name: "GSI3SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: "GSI4",
      partitionKey: { name: "GSI4PK", type: AttributeType.STRING },
      sortKey: { name: "GSI4SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: "GSI5",
      partitionKey: { name: "GSI5PK", type: AttributeType.STRING },
      sortKey: { name: "GSI5SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: "GSI6",
      partitionKey: { name: "GSI6PK", type: AttributeType.STRING },
      sortKey: { name: "GSI6SK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });
  }
}
