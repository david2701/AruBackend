import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Chat as TChat } from "../api/chat/Chat";

type Data = TChat[];

type Props = Omit<SelectFieldProps, "options">;

export const ChatSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/chats", async () => {
    const response = await api.get("/api/chats");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.message && item.message.length ? item.message : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
