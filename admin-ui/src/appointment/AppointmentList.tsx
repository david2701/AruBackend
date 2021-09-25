import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { DOCTOR_TITLE_FIELD } from "../doctor/DoctorTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const AppointmentList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Appointments"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="Clinic" source="clinic" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="Date" source="date" />
        <ReferenceField label="Doctor ID" source="doctor.id" reference="Doctor">
          <TextField source={DOCTOR_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="History" source="history" />
        <TextField label="ID" source="id" />
        <TextField label="Services" source="services" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceField label="User ID" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
