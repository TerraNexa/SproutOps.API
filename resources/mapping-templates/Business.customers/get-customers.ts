import { Context } from "@aws-appsync/utils";
import { batchGet } from "@aws-appsync/utils/dynamodb";
import { TABLE_NAME } from "../../../constants";
import { CustomerMembershipItem } from "../../types/dynamodb";

export function request(ctx: Context) {
  const memberships: CustomerMembershipItem[] = ctx.stash.memberships;

  return batchGet({
    tables: {
      [TABLE_NAME]: {
        keys: memberships.map(({ PK }) => ({ PK, SK: "PROFILE" })),
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.data[TABLE_NAME];
}
