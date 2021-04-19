import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { DoctorTitle } from "../doctor/DoctorTitle";
import { UserTitle } from "../user/UserTitle";
import { Chat as TChat } from "../api/chat/Chat";

type Data = TChat[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "idDoctor",
    title: "Id Doctor",
    sortable: false,
  },
  {
    name: "idUser",
    title: "Id User",
    sortable: false,
  },
  {
    name: "message",
    title: "Message",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const ChatList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/chats",
    async () => {
      const response = await api.get("/api/chats");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Chats"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/chats/new"}>
            <Button>Create Chat </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: TChat) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/chats"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <DoctorTitle id={item.idDoctor?.id} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.idUser?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.message}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
