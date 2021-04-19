import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Secretary as TSecretary } from "../api/secretary/Secretary";

type Props = { id: string };

export const SecretaryTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TSecretary,
    AxiosError,
    [string, string]
  >(["get-/api/secretaries", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/secretaries"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/secretaries"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
