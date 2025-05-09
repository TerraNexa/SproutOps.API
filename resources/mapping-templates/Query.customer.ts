import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { CustomerItem } from "../types/dynamodb";

export function request(ctx: Context<{ customerId: string }>) {
  const { customerId } = ctx.args;

  return get<CustomerItem>({
    key: {
      PK: `CUST#${customerId}`,
      SK: `PROFILE`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
