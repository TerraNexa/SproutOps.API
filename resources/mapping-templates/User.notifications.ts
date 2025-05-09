import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { User } from "../types/appsync";
import { NotificationItem } from "../types/dynamodb";

export function request(ctx: Context) {
  const user: User = ctx.source;

  return query<NotificationItem>({
    query: {
      PK: {
        eq: `USER#${user.userId}`,
      },
      SK: {
        beginsWith: "NOTIF",
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.items;
}
