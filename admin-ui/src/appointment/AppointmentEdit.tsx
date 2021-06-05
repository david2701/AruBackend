import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { DoctorTitle } from "../doctor/DoctorTitle";
import { UserTitle } from "../user/UserTitle";

export const AppointmentEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
