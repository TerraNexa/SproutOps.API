import { Context } from "@aws-appsync/utils";
import { MembershipItem, BusinessItem } from "../../types/dynamodb";

export function request(ctx: Context) {
  return {};
}

export function response(ctx: Context) {
  const memberships: MembershipItem[] = ctx.stash.memberships;
  return (ctx.result as BusinessItem[]).map((business) => ({
    ...business,
    role: memberships.find((m) => m.GSI1PK === business.PK)!.role,
  }));
}
