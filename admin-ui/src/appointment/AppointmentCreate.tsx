import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { DoctorTitle } from "../doctor/DoctorTitle";
import { UserTitle } from "../user/UserTitle";

export const AppointmentCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Clinic" source="clinic" />
        <DateTimeInput label="Date" source="date" />
        <ReferenceInput source="doctor.id" reference="Doctor" label="Doctor ID">
          <SelectInput optionText={DoctorTitle} />
        </ReferenceInput>
        <TextInput label="History" source="history" />
        <TextInput label="Services" source="services" />
        <ReferenceInput source="user.id" reference="User" label="User ID">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
