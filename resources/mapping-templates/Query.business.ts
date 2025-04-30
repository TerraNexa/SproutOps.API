import { Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context<{ businessId: string }>) {
  const { businessId } = ctx.args;

  return ddb.get({
    key: {
      PK: `BUS#${businessId}`,
      SK: "PROFILE",
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
