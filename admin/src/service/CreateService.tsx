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
import { Service as TService } from "../api/service/Service";
import { ServiceCreateInput } from "../api/service/ServiceCreateInput";

const INITIAL_VALUES = {} as ServiceCreateInput;

export const CreateService = (): React.ReactElement => {
  useBreadcrumbs("/services/new", "Create Service");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TService,
    AxiosError,
    ServiceCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/services", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/services"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ServiceCreateInput) => {
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
            <FormHeader title={"Create Service"}>
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
            <TextField label="Services Name" name="servicesName" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
