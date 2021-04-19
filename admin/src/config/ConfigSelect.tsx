import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Config as TConfig } from "../api/config/Config";

type Data = TConfig[];

type Props = Omit<SelectFieldProps, "options">;

export const ConfigSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/configs",
    async () => {
      const response = await api.get("/api/configs");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.apiKeyZoom && item.apiKeyZoom.length
              ? item.apiKeyZoom
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
