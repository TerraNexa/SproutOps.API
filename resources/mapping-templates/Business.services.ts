import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { Business } from "../types/appsync";
import { ServiceItem } from "../types/dynamodb";

export function request(ctx: Context) {
  const business: Business = ctx.source;

  return query<ServiceItem>({
    query: {
      PK: {
        eq: `BUS#${business.businessId}`,
      },
      SK: {
        beginsWith: "SERV",
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.items;
}
