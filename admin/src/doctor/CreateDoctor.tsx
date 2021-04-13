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
  ToggleField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Doctor as TDoctor } from "../api/doctor/Doctor";
import { DoctorCreateInput } from "../api/doctor/DoctorCreateInput";

const INITIAL_VALUES = {} as DoctorCreateInput;

export const CreateDoctor = (): React.ReactElement => {
  useBreadcrumbs("/doctors/new", "Create Doctor");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TDoctor,
    AxiosError,
    DoctorCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/doctors", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/doctors"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DoctorCreateInput) => {
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
            <FormHeader title={"Create Doctor"}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
