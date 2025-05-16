import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { JobItem } from "../types/dynamodb";
import { QueryJobArgs } from "../types/appsync";

export function request(ctx: Context<QueryJobArgs>) {
  const { businessId, jobId } = ctx.args;

  return get<JobItem>({
    key: {
      PK: `BUS#${businessId}`,
      SK: `JOB#${jobId}`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
