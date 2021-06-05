import { Service as TService } from "../api/service/Service";

export const SERVICE_TITLE_FIELD = "servicesName";

export const ServiceTitle = (record: TService) => {
  return record.servicesName;
};
