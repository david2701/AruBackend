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
import { Config as TConfig } from "../api/config/Config";
import { ConfigUpdateInput } from "../api/config/ConfigUpdateInput";

export const ViewConfig = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/configs/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TConfig,
    AxiosError,
    [string, string]
  >(["get-/api/configs", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/configs"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TConfig, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/configs"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//configs");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TConfig, AxiosError, ConfigUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/configs"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ConfigUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.apiKeyZoom);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "apiKeyZoom",
        "apiPaypal",
        "apiSecretZoom",
        "apsStripe",
        "apStripe",
        "fmc_Firebase",
        "push",
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
                title={`${"Config"} ${
                  data?.apiKeyZoom && data?.apiKeyZoom.length
                    ? data.apiKeyZoom
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
              <TextField label="Api Key Zoom" name="apiKeyZoom" />
            </div>
            <div>
              <TextField label="Api Paypal" name="apiPaypal" />
            </div>
            <div>
              <TextField label="Api Secret Zoom" name="apiSecretZoom" />
            </div>
            <div>
              <TextField label="APS Stripe" name="apsStripe" />
            </div>
            <div>
              <TextField label="AP Stripe" name="apStripe" />
            </div>
            <div>
              <TextField label="FMC Firebase" name="fmc_Firebase" />
            </div>
            <div>
              <ToggleField label="Push" name="push" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
