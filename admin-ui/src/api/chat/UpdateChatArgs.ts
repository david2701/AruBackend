import { ChatWhereUniqueInput } from "./ChatWhereUniqueInput";
import { ChatUpdateInput } from "./ChatUpdateInput";

export type UpdateChatArgs = {
  where: ChatWhereUniqueInput;
  data: ChatUpdateInput;
};
