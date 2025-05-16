import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { Job } from "../../types/appsync";
import { JobCrewAssignmentItem } from "../../types/dynamodb";

export function request(ctx: Context<{ businessId: string }>) {
  const job: Job = ctx.source;

  return query<JobCrewAssignmentItem>({
    query: {
      PK: {
        eq: `JOB#${job.jobId}`,
      },
      SK: {
        beginsWith: "CREW",
      },
    },
  });
}

export function response(ctx: Context) {
  ctx.stash.assignment = ctx.result.items[0];
  return;
}
