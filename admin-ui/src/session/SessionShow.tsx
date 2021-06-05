import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ListProps,
  DateField,
  TextField,
} from "react-admin";

export const SessionShow = (props: ListProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Token ID" source="tokenId" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="User ID" source="userId" />
      </SimpleShowLayout>
    </Show>
  );
};
