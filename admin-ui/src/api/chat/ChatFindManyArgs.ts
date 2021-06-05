import { ChatWhereInput } from "./ChatWhereInput";
import { ChatOrderByInput } from "./ChatOrderByInput";

export type ChatFindManyArgs = {
  where?: ChatWhereInput;
  orderBy?: ChatOrderByInput;
  skip?: number;
  take?: number;
};
