import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  BooleanInput,
} from "react-admin";

export const ConfigEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Api Key Zoom" source="apiKeyZoom" />
        <TextInput label="Api Paypal" source="apiPaypal" />
        <TextInput label="Api Secret Zoom" source="apiSecretZoom" />
        <TextInput label="APS Stripe" source="apsStripe" />
        <TextInput label="AP Stripe" source="apStripe" />
        <TextInput label="FMC Firebase" source="fmc_Firebase" />
        <BooleanInput label="Push" source="push" />
        <TextInput label="Push Tag" source="pushTag" />
      </SimpleForm>
    </Edit>
  );
};
