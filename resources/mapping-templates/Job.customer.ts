import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { JobItem } from "../types/dynamodb";

export function request(ctx: Context) {
  const job: JobItem = ctx.source;

  return get({
    key: {
      PK: `CUST#${job.customerId}`,
      SK: "PROFILE",
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
