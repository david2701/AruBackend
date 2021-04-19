import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Secretary as TSecretary } from "../api/secretary/Secretary";

type Data = TSecretary[];

type Props = Omit<SelectFieldProps, "options">;

export const SecretarySelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/secretaries",
    async () => {
      const response = await api.get("/api/secretaries");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.name && item.name.length ? item.name : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
