import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { JobItem } from "../types/dynamodb";
import { QueryInvoiceArgs } from "../types/appsync";

export function request(ctx: Context<QueryInvoiceArgs>) {
  const { businessId, invoiceId } = ctx.args;

  return get<JobItem>({
    key: {
      PK: `BUS#${businessId}`,
      SK: `INV#${invoiceId}`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
