import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DoctorSelect } from "../doctor/DoctorSelect";
import { UserSelect } from "../user/UserSelect";
import { Appointment as TAppointment } from "../api/appointment/Appointment";
import { AppointmentUpdateInput } from "../api/appointment/AppointmentUpdateInput";

export const ViewAppointment = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/appointments/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TAppointment,
    AxiosError,
    [string, string]
  >(["get-/api/appointments", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/appointments"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TAppointment, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/appointments"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//appointments");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TAppointment, AxiosError, AppointmentUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/appointments"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: AppointmentUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.clinic);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "clinic",
        "date",
        "doctorId",
        "history",
        "services",
        "pacient",
      ]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Appointment"} ${
                  data?.clinic && data?.clinic.length ? data.clinic : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
