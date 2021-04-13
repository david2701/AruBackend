import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Service as TService } from "../api/service/Service";

type Data = TService[];

type Props = Omit<SelectFieldProps, "options">;

export const ServiceSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/services",
    async () => {
      const response = await api.get("/api/services");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.servicesName && item.servicesName.length
              ? item.servicesName
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
