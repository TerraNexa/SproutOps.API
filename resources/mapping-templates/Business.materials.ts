import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { Business } from "../types/appsync";
import { MaterialItem } from "../types/dynamodb";

export function request(ctx: Context) {
  const business: Business = ctx.source;

  return query<MaterialItem>({
    query: {
      PK: {
        eq: `BUS#${business.businessId}`,
      },
      SK: {
        beginsWith: "MATERIAL",
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.items;
}
