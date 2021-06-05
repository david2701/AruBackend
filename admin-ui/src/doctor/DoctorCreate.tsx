import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  DateTimeInput,
  BooleanInput,
} from "react-admin";

export const DoctorCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Clinic" source="clinic" />
        <DateTimeInput label="Date Last pacient" source="dateLastPacient" />
        <TextInput label="Email " source="email" type="email" />
        <BooleanInput label="Last Pacient" source="lastPacient" />
        <TextInput label="Mobile" source="mobile" />
        <TextInput label="Name" source="name" />
        <TextInput label="Services" source="services" />
        <TextInput label="Work Hour" source="workHour" />
      </SimpleForm>
    </Create>
  );
};
