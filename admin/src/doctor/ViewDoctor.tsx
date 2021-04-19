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
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Doctor as TDoctor } from "../api/doctor/Doctor";
import { DoctorUpdateInput } from "../api/doctor/DoctorUpdateInput";

export const ViewDoctor = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/doctors/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TDoctor,
    AxiosError,
    [string, string]
  >(["get-/api/doctors", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/doctors"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TDoctor, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/doctors"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//doctors");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TDoctor, AxiosError, DoctorUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/doctors"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: DoctorUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.name);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "clinic",
        "dateLastPacient",
        "email",
        "lastPacient",
        "mobile",
        "name",
        "services",
        "workHour",
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
                title={`${"Doctor"} ${
                  data?.name && data?.name.length ? data.name : data?.id
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
              <TextField
                type="datetime-local"
                label="Date Last pacient"
                name="dateLastPacient"
              />
            </div>
            <div>
              <TextField type="email" label="Email " name="email" />
            </div>
            <div>
              <ToggleField label="Last Pacient" name="lastPacient" />
            </div>
            <div>
              <TextField label="Mobile" name="mobile" />
            </div>
            <div>
              <TextField label="Name" name="name" />
            </div>
            <div>
              <TextField label="Services" name="services" />
            </div>
            <div>
              <TextField label="Work Hour" name="workHour" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
