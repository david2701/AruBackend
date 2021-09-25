import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const ServiceEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Doctor ID" source="doctorId" />
        <TextInput label="Services Name" source="servicesName" />
      </SimpleForm>
    </Edit>
  );
};
