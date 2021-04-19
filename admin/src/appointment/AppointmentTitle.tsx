import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Appointment as TAppointment } from "../api/appointment/Appointment";

type Props = { id: string };

export const AppointmentTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TAppointment,
    AxiosError,
    [string, string]
  >(["get-/api/appointments", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/appointments"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/appointments"}/${id}`} className="entity-id">
      {data?.clinic && data?.clinic.length ? data.clinic : data?.id}
    </Link>
  );
};
