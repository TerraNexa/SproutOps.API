import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { Business } from "../types/appsync";
import { PaymentItem } from "../types/dynamodb";

export function request(ctx: Context) {
  const business: Business = ctx.source;

  return query<PaymentItem>({
    query: {
      PK: {
        eq: `BUS#${business.businessId}`,
      },
      SK: {
        beginsWith: "PAY",
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.items;
}
