import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { Customer } from "../types/appsync";
import { InvoiceItem } from "../types/dynamodb";
import { INDEX_GSI5 } from "../../constants";

export function request(ctx: Context) {
  const customer: Customer = ctx.source;

  return query<InvoiceItem>({
    index: INDEX_GSI5,
    query: {
      GSI5PK: {
        eq: `CUST#${customer.customerId}`,
      },
      GSI5SK: {
        beginsWith: "INV",
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.items;
}
