import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DoctorSelect } from "../doctor/DoctorSelect";
import { UserSelect } from "../user/UserSelect";
import { Appointment as TAppointment } from "../api/appointment/Appointment";
import { AppointmentCreateInput } from "../api/appointment/AppointmentCreateInput";

const INITIAL_VALUES = {} as AppointmentCreateInput;

export const CreateAppointment = (): React.ReactElement => {
  useBreadcrumbs("/appointments/new", "Create Appointment");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TAppointment,
    AxiosError,
    AppointmentCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/appointments", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/appointments"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: AppointmentCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Appointment"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Clinic" name="clinic" />
          </div>
          <div>
            <TextField type="datetime-local" label="Date" name="date" />
          </div>
          <div>
            <DoctorSelect label="Doctor ID" name="doctorId.id" />
          </div>
          <div>
            <TextField label="History" name="history" />
          </div>
          <div>
            <TextField label="Services" name="services" />
          </div>
          <div>
            <UserSelect label="User ID" name="pacient.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
