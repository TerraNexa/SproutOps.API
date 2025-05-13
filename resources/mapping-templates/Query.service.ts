import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { ServiceItem } from "../types/dynamodb";
import { QueryServiceArgs } from "../types/appsync";

export function request(ctx: Context<QueryServiceArgs>) {
  const { businessId, serviceId } = ctx.args;

  return get<ServiceItem>({
    key: {
      PK: `BUS#${businessId}`,
      SK: `SERV#${serviceId}`,
    },
  });
}

export function response(ctx: Context) {
  return ctx.result;
}
