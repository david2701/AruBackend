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
import { Service as TService } from "../api/service/Service";
import { ServiceUpdateInput } from "../api/service/ServiceUpdateInput";

export const ViewService = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/services/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TService,
    AxiosError,
    [string, string]
  >(["get-/api/services", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/services"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TService, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/services"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//services");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TService, AxiosError, ServiceUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/services"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ServiceUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.servicesName);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["doctorId", "servicesName"]),
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
                title={`${"Service"} ${
                  data?.servicesName && data?.servicesName.length
                    ? data.servicesName
                    : data?.id
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
              <TextField label="Doctor ID" name="doctorId" />
            </div>
            <div>
              <TextField label="Services Name" name="servicesName" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
