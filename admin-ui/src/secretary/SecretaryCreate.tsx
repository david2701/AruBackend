import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const SecretaryCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Doctor ID" source="doctorId" />
        <TextInput label="Name" source="name" />
      </SimpleForm>
    </Create>
  );
};
