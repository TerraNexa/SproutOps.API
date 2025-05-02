import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { Business } from "../types/appsync";
import { JobItem } from "../types/dynamodb";

export function request(ctx: Context<{ businessId: string }>) {
  const business: Business = ctx.source;

  return query<JobItem>({
    query: {
      PK: {
        eq: `BUS#${business.businessId}`,
      },
      SK: {
        beginsWith: "JOB",
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.items;
}
