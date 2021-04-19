import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Config as TConfig } from "../api/config/Config";

type Props = { id: string };

export const ConfigTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TConfig,
    AxiosError,
    [string, string]
  >(["get-/api/configs", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/configs"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/configs"}/${id}`} className="entity-id">
      {data?.apiKeyZoom && data?.apiKeyZoom.length ? data.apiKeyZoom : data?.id}
    </Link>
  );
};
