import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { UserItem } from "../types/dynamodb";

export function request(ctx: Context<{ userId: string }>) {
  const { userId } = ctx.args;

  return get<UserItem>({
    key: {
      PK: `USER#${userId}`,
      SK: `PROFILE`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
