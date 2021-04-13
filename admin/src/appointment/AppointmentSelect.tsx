import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Appointment as TAppointment } from "../api/appointment/Appointment";

type Data = TAppointment[];

type Props = Omit<SelectFieldProps, "options">;

export const AppointmentSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/appointments",
    async () => {
      const response = await api.get("/api/appointments");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.clinic && item.clinic.length ? item.clinic : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
