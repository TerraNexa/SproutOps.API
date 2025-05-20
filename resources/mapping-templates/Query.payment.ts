import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { PaymentItem } from "../types/dynamodb";
import { QueryPaymentArgs } from "../types/appsync";

export function request(ctx: Context<QueryPaymentArgs>) {
  const { businessId, paymentId } = ctx.args;

  return get<PaymentItem>({
    key: {
      PK: `BUS#${businessId}`,
      SK: `PAY#${paymentId}`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
