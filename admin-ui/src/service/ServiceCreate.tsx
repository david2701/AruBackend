import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const ServiceCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Doctor ID" source="doctorId" />
        <TextInput label="Services Name" source="servicesName" />
      </SimpleForm>
    </Create>
  );
};
