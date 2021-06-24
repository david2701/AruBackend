import { Config as TConfig } from "../api/config/Config";

export const CONFIG_TITLE_FIELD = "apiKeyZoom";

export const ConfigTitle = (record: TConfig) => {
  return record.apiKeyZoom;
};
