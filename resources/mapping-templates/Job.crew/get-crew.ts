import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { CrewItem, JobCrewAssignmentItem } from "../../types/dynamodb";

export function request(ctx: Context) {
  const assignment: JobCrewAssignmentItem = ctx.stash.assignment;

  return get<CrewItem>({
    key: {
      PK: `BUS#${assignment.businessId}`,
      SK: `CREW#${assignment.crewId}`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
