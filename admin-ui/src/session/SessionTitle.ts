import { Session as TSession } from "../api/session/Session";

export const SESSION_TITLE_FIELD = "tokenId";

export const SessionTitle = (record: TSession) => {
  return record.tokenId;
};
