import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { User } from "../../types/appsync";
import { MembershipItem } from "../../types/dynamodb";
import { INDEX_GSI1 } from "../../../constants";

export function request(ctx: Context) {
  const user: User = ctx.source;

  return query<MembershipItem>({
    query: {
      PK: {
        eq: `USER#${user.userId}`,
      },
      SK: {
        beginsWith: "BUS",
      },
    },
  });
}

export function response(ctx: Context) {
  const items: MembershipItem[] = ctx.result.items;
  ctx.stash.memberships = items;
}
