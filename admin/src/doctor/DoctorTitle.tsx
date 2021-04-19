import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Doctor as TDoctor } from "../api/doctor/Doctor";

type Props = { id: string };

export const DoctorTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TDoctor,
    AxiosError,
    [string, string]
  >(["get-/api/doctors", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/doctors"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/doctors"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
