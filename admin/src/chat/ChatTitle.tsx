import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Chat as TChat } from "../api/chat/Chat";

type Props = { id: string };

export const ChatTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TChat,
    AxiosError,
    [string, string]
  >(["get-/api/chats", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/chats"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/chats"}/${id}`} className="entity-id">
      {data?.message && data?.message.length ? data.message : data?.id}
    </Link>
  );
};
