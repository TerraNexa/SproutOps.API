import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { Customer } from "../types/appsync";
import { InvoiceItem } from "../types/dynamodb";
import { INDEX_GSI2 } from "../../constants";

export function request(ctx: Context) {
  const customer: Customer = ctx.source;

  return query<InvoiceItem>({
    index: INDEX_GSI2,
    query: {
      GSI2PK: {
        eq: `CUST#${customer.customerId}`,
      },
      GSI2SK: {
        beginsWith: "INV",
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.items;
}
