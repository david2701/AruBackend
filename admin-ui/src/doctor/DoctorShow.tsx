import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ListProps,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";

export const DoctorShow = (props: ListProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Clinic" source="clinic" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="Date Last pacient" source="dateLastPacient" />
        <TextField label="Email " source="email" />
        <TextField label="ID" source="id" />
        <BooleanField label="Last Pacient" source="lastPacient" />
        <TextField label="Mobile" source="mobile" />
        <TextField label="Name" source="name" />
        <TextField label="Services" source="services" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="Work Hour" source="workHour" />
      </SimpleShowLayout>
    </Show>
  );
};
