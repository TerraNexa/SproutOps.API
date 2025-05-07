import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { Business } from "../../types/appsync";
import { CustomerMembershipItem } from "../../types/dynamodb";
import { INDEX_GSI1 } from "../../../constants";

export function request(ctx: Context) {
  const business: Business = ctx.source;

  return query<CustomerMembershipItem>({
    index: INDEX_GSI1,
    query: {
      GSI1PK: {
        eq: `BUS#${business.businessId}`,
      },
      GSI1SK: {
        beginsWith: "CUST",
      },
    },
  });
}

export function response(ctx: Context) {
  const items: CustomerMembershipItem[] = ctx.result.items;
  ctx.stash.memberships = items;
}
