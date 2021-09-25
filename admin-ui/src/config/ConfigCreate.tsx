import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  BooleanInput,
} from "react-admin";

export const ConfigCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Api Agora" source="apiAgora" />
        <TextInput label="Api Key Zoom" source="apiKeyZoom" />
        <TextInput label="Api Paypal" source="apiPaypal" />
        <TextInput label="Api Secret Zoom" source="apiSecretZoom" />
        <TextInput label="APS Stripe" source="apsStripe" />
        <TextInput label="AP Stripe" source="apStripe" />
        <TextInput label="FMC Firebase" source="fmc_Firebase" />
        <BooleanInput label="Push" source="push" />
        <TextInput label="Push Tag" source="pushTag" />
        <div />
      </SimpleForm>
    </Create>
  );
};
