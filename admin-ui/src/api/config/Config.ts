import { JsonValue } from "type-fest";

export type Config = {
  apiAgora: string;
  apiKeyZoom: string | null;
  apiPaypal: string | null;
  apiSecretZoom: string | null;
  apsStripe: string | null;
  apStripe: string | null;
  createdAt: Date;
  fmc_Firebase: string | null;
  id: string;
  push: boolean | null;
  pushTag: string | null;
  timeRefresh: JsonValue | null;
  updatedAt: Date;
};
