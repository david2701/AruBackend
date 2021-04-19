import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Session as TSession } from "../api/session/Session";

type Data = TSession[];

type Props = Omit<SelectFieldProps, "options">;

export const SessionSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/sessions",
    async () => {
      const response = await api.get("/api/sessions");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.tokenId && item.tokenId.length ? item.tokenId : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
