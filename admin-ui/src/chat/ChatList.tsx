import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { DOCTOR_TITLE_FIELD } from "../doctor/DoctorTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const ChatList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Chats"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <ReferenceField label="Id Doctor" source="doctor.id" reference="Doctor">
          <TextField source={DOCTOR_TITLE_FIELD} />
        </ReferenceField>
        <ReferenceField label="Id User" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Message" source="message" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
