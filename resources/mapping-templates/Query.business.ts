import { Context, util } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context<{ businessId: string }>) {
  const { businessId } = ctx.args;

  return get({
    key: {
      PK: `BUS#${businessId}`,
      SK: "PROFILE",
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
