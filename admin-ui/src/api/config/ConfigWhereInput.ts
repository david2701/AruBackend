import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { JsonNullableFilter } from "../../util/JsonNullableFilter";

export type ConfigWhereInput = {
  apiAgora?: StringFilter;
  id?: StringFilter;
  pushTag?: StringNullableFilter;
  timeRefresh?: JsonNullableFilter;
};
