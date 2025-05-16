import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { CustomerItem, InvoiceItem } from "../types/dynamodb";
import { QueryInvoiceArgs } from "../types/appsync";

export function request(ctx: Context<QueryInvoiceArgs>) {
  const invoice: InvoiceItem = ctx.source;

  return get<CustomerItem>({
    key: {
      PK: `CUST#${invoice.customerId}`,
      SK: `PROFILE`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
