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
import { Secretary as TSecretary } from "../api/secretary/Secretary";
import { SecretaryCreateInput } from "../api/secretary/SecretaryCreateInput";

const INITIAL_VALUES = {} as SecretaryCreateInput;

export const CreateSecretary = (): React.ReactElement => {
  useBreadcrumbs("/secretaries/new", "Create Secretary");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TSecretary,
    AxiosError,
    SecretaryCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/secretaries", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/secretaries"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: SecretaryCreateInput) => {
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
            <FormHeader title={"Create Secretary"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Doctor ID" name="doctorId" />
          </div>
          <div>
            <TextField label="Name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
