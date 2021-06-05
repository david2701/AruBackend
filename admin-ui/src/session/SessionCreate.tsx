import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const SessionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Token ID" source="tokenId" />
        <TextInput label="User ID" source="userId" />
      </SimpleForm>
    </Create>
  );
};
