import { Secretary as TSecretary } from "../api/secretary/Secretary";

export const SECRETARY_TITLE_FIELD = "name";

export const SecretaryTitle = (record: TSecretary): string => {
  return record.name || record.id;
};
