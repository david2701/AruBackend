import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { DoctorTitle } from "../doctor/DoctorTitle";
import { UserTitle } from "../user/UserTitle";

export const ChatCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="doctor.id" reference="Doctor" label="Id Doctor">
          <SelectInput optionText={DoctorTitle} />
        </ReferenceInput>
        <ReferenceInput source="user.id" reference="User" label="Id User">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
        <TextInput label="Message" source="message" />
      </SimpleForm>
    </Create>
  );
};
