import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";
import Pagination from "../Components/Pagination";

export const ConfigList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Configs"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="Api Key Zoom" source="apiKeyZoom" />
        <TextField label="Api Paypal" source="apiPaypal" />
        <TextField label="Api Secret Zoom" source="apiSecretZoom" />
        <TextField label="APS Stripe" source="apsStripe" />
        <TextField label="AP Stripe" source="apStripe" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="FMC Firebase" source="fmc_Firebase" />
        <TextField label="ID" source="id" />
        <BooleanField label="Push" source="push" />
        <TextField label="Push Tag" source="pushTag" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
