import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const SecretaryEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Doctor ID" source="doctorId" />
        <TextInput label="Name" source="name" />
      </SimpleForm>
    </Edit>
  );
};
