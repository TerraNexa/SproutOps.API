import { Context } from "@aws-appsync/utils";
import { MembershipItem, UserItem } from "../../types/dynamodb";

export function request(ctx: Context) {
  return {};
}

export function response(ctx: Context) {
  return ctx.result;
}
