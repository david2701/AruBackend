import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ListProps,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";

export const ConfigShow = (props: ListProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
      </SimpleShowLayout>
    </Show>
  );
};