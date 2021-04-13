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
  CircleIcon,
  EnumCircleIconStyle,
} from "@amplication/design-system";

import { Config as TConfig } from "../api/config/Config";

type Data = TConfig[];

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
    name: "apiKeyZoom",
    title: "Api Key Zoom",
    sortable: false,
  },
  {
    name: "apiPaypal",
    title: "Api Paypal",
    sortable: false,
  },
  {
    name: "apiSecretZoom",
    title: "Api Secret Zoom",
    sortable: false,
  },
  {
    name: "apsStripe",
    title: "APS Stripe",
    sortable: false,
  },
  {
    name: "apStripe",
    title: "AP Stripe",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "fmc_Firebase",
    title: "FMC Firebase",
    sortable: false,
  },
  {
    name: "push",
    title: "Push",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const ConfigList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/configs",
    async () => {
      const response = await api.get("/api/configs");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Configs"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/configs/new"}>
            <Button>Create Config </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: TConfig) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/configs"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.apiKeyZoom}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.apiPaypal}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.apiSecretZoom}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.apsStripe}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.apStripe}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.fmc_Firebase}</>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.push && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
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
