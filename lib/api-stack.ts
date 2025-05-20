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
    this.createBusinessCrewsResolver();
    this.createBusinessCustomersResolver();
    this.createBusinessEquipmentResolver();
    this.createBusinessExpensesResolver();
    this.createBusinessInvoicesResolver();
    this.createBusinessJobsResolver();
    this.createBusinessMaterialsResolver();
    this.createBusinessPaymentsResolver();
    this.createBusinessProposalsResolver();
    this.createBusinessRecurringJobsResolver();
    this.createBusinessServicesResolver();
    this.createBusinessUsersResolver();

    // Customer Resolvers
    this.createQueryCustomerResolver();
    this.createCustomerInvoicesResolver();
    this.createCustomerJobsResolver();
    this.createCustomerPaymentsResolver();
    this.createCustomerProposalsResolver();
    this.createCustomerRecurringJobsResolver();

    // Invoice Resolvers
    this.createQueryInvoiceResolver();
    this.createInvoiceCustomerResolver();

    // Job Resolvers
    this.createQueryJobResolver();
    this.createJobCrewResolver();
    this.createJobCustomerResolver();

    // Payment Resolvers
    this.createQueryPaymentResolver();
    this.createPaymentInvoiceResolver();

    // Service Resolvers
    this.createQueryServiceResolver();

    // User Resolvers
    this.createQueryUserResolver();
    this.createUserBusinessesResolver();
    this.createUserNotificationsResolver();
    this.createUserTimeEntriesResolver();
  }

  // Business Resolvers
  private createQueryBusinessResolver() {
    this.tableDataSource.createResolver("QueryBusinessResolver", {
      typeName: "Query",
      fieldName: "business",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Query.business.js"),
    });
  }

  private createBusinessCrewsResolver() {
    this.tableDataSource.createResolver("BusinessCrewsResolver", {
      typeName: "Business",
      fieldName: "crews",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.crews.js"),
    });
  }

  private createBusinessCustomersResolver() {
    const getMemberships = this.tableDataSource.createFunction(
      "BusinessCustomersGetMembershipsFunction",
      {
        name: "BusinessCustomersGetMembershipsFunction",
        runtime: FunctionRuntime.JS_1_0_0,
        code: Code.fromAsset(
          "dist/mapping-templates/Business.customers/get-memberships.js"
        ),
      }
    );

    const getCustomers = this.tableDataSource.createFunction(
      "BusinessCustomersGetCustomersFunction",
      {
        name: "BusinessCustomersGetCustomersFunction",
        runtime: FunctionRuntime.JS_1_0_0,
        code: Code.fromAsset(
          "dist/mapping-templates/Business.customers/get-customers.js"
        ),
      }
    );

    this.api.createResolver("BusinessCustomersResolver", {
      typeName: "Business",
      fieldName: "customers",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset(
        "dist/mapping-templates/Business.customers/pipeline-resolver.js"
      ),
      pipelineConfig: [getMemberships, getCustomers],
    });
  }

  private createBusinessEquipmentResolver() {
    this.tableDataSource.createResolver("BusinessEquipmentResolver", {
      typeName: "Business",
      fieldName: "equipment",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.equipment.js"),
    });
  }

  private createBusinessExpensesResolver() {
    this.tableDataSource.createResolver("BusinessExpensesResolver", {
      typeName: "Business",
      fieldName: "expenses",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.expenses.js"),
    });
  }

  private createBusinessInvoicesResolver() {
    this.tableDataSource.createResolver("BusinessInvoicesResolver", {
      typeName: "Business",
      fieldName: "invoices",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.invoices.js"),
    });
  }

  private createBusinessJobsResolver() {
    this.tableDataSource.createResolver("BusinessJobsResolver", {
      typeName: "Business",
      fieldName: "jobs",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.jobs.js"),
    });
  }

  private createBusinessMaterialsResolver() {
    this.tableDataSource.createResolver("BusinessMaterialsResolver", {
      typeName: "Business",
      fieldName: "materials",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.materials.js"),
    });
  }

  private createBusinessPaymentsResolver() {
    this.tableDataSource.createResolver("BusinessPaymentsResolver", {
      typeName: "Business",
      fieldName: "payments",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.payments.js"),
    });
  }

  private createBusinessProposalsResolver() {
    this.tableDataSource.createResolver("BusinessProposalsResolver", {
      typeName: "Business",
      fieldName: "proposals",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.proposals.js"),
    });
  }

  private createBusinessRecurringJobsResolver() {
    this.tableDataSource.createResolver("BusinessRecurringJobsResolver", {
      typeName: "Business",
      fieldName: "recurringJobs",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Business.recurringJobs.js"),
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

  // Customer Resolvers
  private createQueryCustomerResolver() {
    this.tableDataSource.createResolver("QueryCustomerResolver", {
      typeName: "Query",
      fieldName: "customer",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Query.customer.js"),
    });
  }

  private createCustomerInvoicesResolver() {
    this.tableDataSource.createResolver("CustomerInvoicesResolver", {
      typeName: "Customer",
      fieldName: "invoices",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Customer.invoices.js"),
    });
  }

  private createCustomerJobsResolver() {
    this.tableDataSource.createResolver("CustomerJobsResolver", {
      typeName: "Customer",
      fieldName: "jobs",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Customer.jobs.js"),
    });
  }

  private createCustomerPaymentsResolver() {
    this.tableDataSource.createResolver("CustomerPaymentsResolver", {
      typeName: "Customer",
      fieldName: "payments",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Customer.payments.js"),
    });
  }

  private createCustomerProposalsResolver() {
    this.tableDataSource.createResolver("CustomerProposalsResolver", {
      typeName: "Customer",
      fieldName: "proposals",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Customer.proposals.js"),
    });
  }

  private createCustomerRecurringJobsResolver() {
    this.tableDataSource.createResolver("CustomerRecurringJobsResolver", {
      typeName: "Customer",
      fieldName: "recurringJobs",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Customer.recurringJobs.js"),
    });
  }

  // Invoice Resolvers
  private createQueryInvoiceResolver() {
    this.tableDataSource.createResolver("QueryInvoiceResolver", {
      typeName: "Query",
      fieldName: "invoice",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Query.invoice.js"),
    });
  }

  private createInvoiceCustomerResolver() {
    this.tableDataSource.createResolver("InvoiceCustomerResolver", {
      typeName: "Invoice",
      fieldName: "customer",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Invoice.customer.js"),
    });
  }

  // Job Resolvers
  private createQueryJobResolver() {
    this.tableDataSource.createResolver("QueryJobResolver", {
      typeName: "Query",
      fieldName: "job",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Query.job.js"),
    });
  }

  private createJobCrewResolver() {
    const getAssignment = this.tableDataSource.createFunction(
      "JobCrewGetAssignmentFunction",
      {
        name: "JobCrewGetAssignmentFunction",
        runtime: FunctionRuntime.JS_1_0_0,
        code: Code.fromAsset(
          "dist/mapping-templates/Job.crew/get-assignment.js"
        ),
      }
    );

    const getCrew = this.tableDataSource.createFunction(
      "JobCrewGetCrewFunction",
      {
        name: "JobCrewGetCrewFunction",
        runtime: FunctionRuntime.JS_1_0_0,
        code: Code.fromAsset("dist/mapping-templates/Job.crew/get-crew.js"),
      }
    );

    this.api.createResolver("JobCrewResolver", {
      typeName: "Job",
      fieldName: "crew",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset(
        "dist/mapping-templates/Job.crew/pipeline-resolver.js"
      ),
      pipelineConfig: [getAssignment, getCrew],
    });
  }

  private createJobCustomerResolver() {
    this.tableDataSource.createResolver("JobCustomerResolver", {
      typeName: "Job",
      fieldName: "customer",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Job.customer.js"),
    });
  }

  // Payment Resolvers
  private createQueryPaymentResolver() {
    this.tableDataSource.createResolver("QueryPaymentResolver", {
      typeName: "Query",
      fieldName: "payment",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Query.payment.js"),
    });
  }

  private createPaymentInvoiceResolver() {
    this.tableDataSource.createResolver("PaymentInvoiceResolver", {
      typeName: "Payment",
      fieldName: "invoice",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Payment.invoice.js"),
    });
  }

  // Service Resolvers
  private createQueryServiceResolver() {
    this.tableDataSource.createResolver("QueryServiceResolver", {
      typeName: "Query",
      fieldName: "service",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Query.service.js"),
    });
  }

  // User Resolvers
  private createQueryUserResolver() {
    this.tableDataSource.createResolver("QueryUserResolver", {
      typeName: "Query",
      fieldName: "user",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/Query.user.js"),
    });
  }

  private createUserBusinessesResolver() {
    const getMemberships = this.tableDataSource.createFunction(
      "UserBusinessesGetMembershipsFunction",
      {
        name: "UserBusinessesGetMembershipsFunction",
        runtime: FunctionRuntime.JS_1_0_0,
        code: Code.fromAsset(
          "dist/mapping-templates/User.businesses/get-memberships.js"
        ),
      }
    );

    const getBusinesses = this.tableDataSource.createFunction(
      "UserBusinessesGetBusinessesFunction",
      {
        name: "UserBusinessesGetBusinessesFunction",
        runtime: FunctionRuntime.JS_1_0_0,
        code: Code.fromAsset(
          "dist/mapping-templates/User.businesses/get-businesses.js"
        ),
      }
    );

    this.api.createResolver("UserBusinessesResolver", {
      typeName: "User",
      fieldName: "businesses",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset(
        "dist/mapping-templates/User.businesses/pipeline-resolver.js"
      ),
      pipelineConfig: [getMemberships, getBusinesses],
    });
  }

  private createUserNotificationsResolver() {
    this.tableDataSource.createResolver("UserNotificationsResolver", {
      typeName: "User",
      fieldName: "notifications",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/User.notifications.js"),
    });
  }

  private createUserTimeEntriesResolver() {
    this.tableDataSource.createResolver("UserTimeEntriesResolver", {
      typeName: "User",
      fieldName: "timeEntries",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset("dist/mapping-templates/User.timeEntries.js"),
    });
  }
}
