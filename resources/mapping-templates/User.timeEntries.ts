import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { User } from "../types/appsync";
import { TimeEntryItem } from "../types/dynamodb";
import { INDEX_GSI1 } from "../../constants";

export function request(ctx: Context) {
  const user: User = ctx.source;

  return query<TimeEntryItem>({
    index: INDEX_GSI1,
    query: {
      GSI1PK: {
        eq: `USER#${user.userId}`,
      },
      GSI1SK: {
        beginsWith: "TIME",
      },
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.items;
}
