import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ListProps,
  DateField,
  TextField,
} from "react-admin";

export const ServiceShow = (props: ListProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="Doctor ID" source="doctorId" />
        <TextField label="ID" source="id" />
        <TextField label="Services Name" source="servicesName" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
