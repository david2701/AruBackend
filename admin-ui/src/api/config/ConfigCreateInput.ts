import { JsonValue } from "type-fest";

export type ConfigCreateInput = {
  apiAgora: string;
  apiKeyZoom?: string | null;
  apiPaypal?: string | null;
  apiSecretZoom?: string | null;
  apsStripe?: string | null;
  apStripe?: string | null;
  fmc_Firebase?: string | null;
  push?: boolean | null;
  pushTag?: string | null;
  timeRefresh?: JsonValue | null;
};
