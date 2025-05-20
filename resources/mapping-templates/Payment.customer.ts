import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { PaymentItem } from "../types/dynamodb";

export function request(ctx: Context<{ businessId: string }>) {
  const payment: PaymentItem = ctx.source;

  return get({
    key: {
      PK: `CUST#${payment.customerId}`,
      SK: `PROFILE`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
