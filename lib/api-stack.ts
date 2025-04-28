import { Duration, Expiration, Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  FieldLogLevel,
  GraphqlApi,
  SchemaFile,
} from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

interface SproutOpsApiStackProps extends StackProps {
  sproutOpsTable: Table;
}

export class SproutOpsApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: SproutOpsApiStackProps) {
    super(scope, id, props);

    const api = new GraphqlApi(this, "SproutOpsGraphQLApi", {
      name: "sproutops-dev-graphql-api",
      definition: {
        schema: SchemaFile.fromAsset("lib/graphql/shema.graphql"),
      },
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
        retention: RetentionDays.TWO_WEEKS,
      },
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: "renopu-dev-app-appointment-graphql-api-key",
            expires: Expiration.after(Duration.days(365)),
          },
        },
      },
    });

    api.addDynamoDbDataSource(
      "SproutOpsTableDataSource",
      props!.sproutOpsTable
    );
  }
}
