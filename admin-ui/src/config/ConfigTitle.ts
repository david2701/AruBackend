import { Config as TConfig } from "../api/config/Config";

export const CONFIG_TITLE_FIELD = "apiAgora";

export const ConfigTitle = (record: TConfig): string => {
  return record.apiAgora || record.id;
};
