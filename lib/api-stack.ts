import { Duration, Expiration, Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  Code,
  DynamoDbDataSource,
  FieldLogLevel,
  FunctionRuntime,
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
  private api: GraphqlApi;
  private tableDataSource: DynamoDbDataSource;

  constructor(scope: Construct, id: string, props?: SproutOpsApiStackProps) {
    super(scope, id, props);

    this.api = new GraphqlApi(this, "SproutOpsGraphQLApi", {
      name: "sproutops-dev-graphql-api",
      definition: {
        schema: SchemaFile.fromAsset("lib/graphql/schema.graphql"),
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

    this.tableDataSource = this.api.addDynamoDbDataSource(
      "SproutOpsTableDataSource",
      props!.sproutOpsTable
    );

    // Business Resolvers
    this.createQueryBusinessResolver();
    this.createBusinessUsersResolver();
    this.createBusinessServicesResolver();
  }

  private createQueryBusinessResolver() {
    this.tableDataSource.createResolver("QueryBusinessResolver", {
      typeName: "Query",
      fieldName: "business",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Query.business.js"),
    });
  }

  private createBusinessUsersResolver() {
    const getMemberships = this.tableDataSource.createFunction(
      "BusinessUsersGetMembershipsFunction",
      {
        name: "BusinessUsersGetMembershipsFunction",
        runtime: FunctionRuntime.JS_1_0_0,
        code: Code.fromAsset(
          "dist/mapping-templates/Business.users/get-memberships.js"
        ),
      }
    );

    const getUsers = this.tableDataSource.createFunction(
      "BusinessUsersGetUsersFunction",
      {
        name: "BusinessUsersGetUsersFunction",
        runtime: FunctionRuntime.JS_1_0_0,
        code: Code.fromAsset(
          "dist/mapping-templates/Business.users/get-users.js"
        ),
      }
    );

    this.api.createResolver("BusinessUsersResolver", {
      typeName: "Business",
      fieldName: "users",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset(
        "dist/mapping-templates/Business.users/pipeline-resolver.js"
      ),
      pipelineConfig: [getMemberships, getUsers],
    });
  }

  private createBusinessServicesResolver() {
    this.tableDataSource.createResolver("BusinessServicesResolver", {
      typeName: "Business",
      fieldName: "services",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.services.js"),
    });
  }
}
