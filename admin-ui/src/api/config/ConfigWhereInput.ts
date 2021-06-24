import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type ConfigWhereInput = {
  id?: StringFilter;
  pushTag?: StringNullableFilter;
};
