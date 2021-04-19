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
import { Config as TConfig } from "../api/config/Config";
import { ConfigCreateInput } from "../api/config/ConfigCreateInput";

const INITIAL_VALUES = {} as ConfigCreateInput;

export const CreateConfig = (): React.ReactElement => {
  useBreadcrumbs("/configs/new", "Create Config");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TConfig,
    AxiosError,
    ConfigCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/configs", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/configs"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ConfigCreateInput) => {
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
            <FormHeader title={"Create Config"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
