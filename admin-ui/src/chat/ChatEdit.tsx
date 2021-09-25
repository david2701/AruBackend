import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { DoctorTitle } from "../doctor/DoctorTitle";
import { UserTitle } from "../user/UserTitle";

export const ChatEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput source="doctor.id" reference="Doctor" label="Id Doctor">
          <SelectInput optionText={DoctorTitle} />
        </ReferenceInput>
        <ReferenceInput source="user.id" reference="User" label="Id User">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
        <TextInput label="Message" source="message" />
      </SimpleForm>
    </Edit>
  );
};
