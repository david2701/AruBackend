import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const SessionEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Token ID" source="tokenId" />
        <TextInput label="User ID" source="userId" />
      </SimpleForm>
    </Edit>
  );
};
