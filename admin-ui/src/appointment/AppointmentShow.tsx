import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import { DOCTOR_TITLE_FIELD } from "../doctor/DoctorTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const AppointmentShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
      </SimpleShowLayout>
    </Show>
  );
};
