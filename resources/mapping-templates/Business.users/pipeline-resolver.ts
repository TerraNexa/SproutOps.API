import { Context } from "@aws-appsync/utils";
import { MembershipItem, UserItem } from "../../types/dynamodb";

export function request(ctx: Context) {
  return {};
}

export function response(ctx: Context) {
  const memberships: MembershipItem[] = ctx.stash.memberships;
  return (ctx.result as UserItem[]).map((user) => ({
    ...user,
    role: memberships.find((m) => m.PK === user.PK)!.role,
  }));
}
