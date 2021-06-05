import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";
import Pagination from "../Components/Pagination";

export const DoctorList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Doctors"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="Clinic" source="clinic" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="Date Last pacient" source="dateLastPacient" />
        <TextField label="Email " source="email" />
        <TextField label="ID" source="id" />
        <BooleanField label="Last Pacient" source="lastPacient" />
        <TextField label="Mobile" source="mobile" />
        <TextField label="Name" source="name" />
        <TextField label="Services" source="services" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="Work Hour" source="workHour" />
      </Datagrid>
    </List>
  );
};
