/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getServer } from "./graphql/queries";
import { updateServer } from "./graphql/mutations";
const client = generateClient();
export default function ServerUpdateForm(props) {
  const {
    id: idProp,
    server: serverModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    configuration: "",
    baseUrl: "",
    publicIP: "",
    encoding: "",
    version: "",
    userEmail: "",
    name: "",
    description: "",
    ecsTaskName: "",
    status: "",
  };
  const [configuration, setConfiguration] = React.useState(
    initialValues.configuration
  );
  const [baseUrl, setBaseUrl] = React.useState(initialValues.baseUrl);
  const [publicIP, setPublicIP] = React.useState(initialValues.publicIP);
  const [encoding, setEncoding] = React.useState(initialValues.encoding);
  const [version, setVersion] = React.useState(initialValues.version);
  const [userEmail, setUserEmail] = React.useState(initialValues.userEmail);
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [ecsTaskName, setEcsTaskName] = React.useState(
    initialValues.ecsTaskName
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = serverRecord
      ? { ...initialValues, ...serverRecord }
      : initialValues;
    setConfiguration(
      typeof cleanValues.configuration === "string" ||
        cleanValues.configuration === null
        ? cleanValues.configuration
        : JSON.stringify(cleanValues.configuration)
    );
    setBaseUrl(cleanValues.baseUrl);
    setPublicIP(cleanValues.publicIP);
    setEncoding(cleanValues.encoding);
    setVersion(cleanValues.version);
    setUserEmail(cleanValues.userEmail);
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setEcsTaskName(cleanValues.ecsTaskName);
    setStatus(cleanValues.status);
    setErrors({});
  };
  const [serverRecord, setServerRecord] = React.useState(serverModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getServer.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getServer
        : serverModelProp;
      setServerRecord(record);
    };
    queryData();
  }, [idProp, serverModelProp]);
  React.useEffect(resetStateValues, [serverRecord]);
  const validations = {
    configuration: [{ type: "JSON" }],
    baseUrl: [],
    publicIP: [],
    encoding: [{ type: "Required" }],
    version: [{ type: "Required" }],
    userEmail: [{ type: "Required" }, { type: "Email" }],
    name: [{ type: "Required" }],
    description: [],
    ecsTaskName: [],
    status: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          configuration: configuration ?? null,
          baseUrl: baseUrl ?? null,
          publicIP: publicIP ?? null,
          encoding,
          version,
          userEmail,
          name,
          description: description ?? null,
          ecsTaskName: ecsTaskName ?? null,
          status: status ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateServer.replaceAll("__typename", ""),
            variables: {
              input: {
                id: serverRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ServerUpdateForm")}
      {...rest}
    >
      <TextAreaField
        label="Configuration"
        isRequired={false}
        isReadOnly={false}
        value={configuration}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration: value,
              baseUrl,
              publicIP,
              encoding,
              version,
              userEmail,
              name,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.configuration ?? value;
          }
          if (errors.configuration?.hasError) {
            runValidationTasks("configuration", value);
          }
          setConfiguration(value);
        }}
        onBlur={() => runValidationTasks("configuration", configuration)}
        errorMessage={errors.configuration?.errorMessage}
        hasError={errors.configuration?.hasError}
        {...getOverrideProps(overrides, "configuration")}
      ></TextAreaField>
      <TextField
        label="Base url"
        isRequired={false}
        isReadOnly={false}
        value={baseUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl: value,
              publicIP,
              encoding,
              version,
              userEmail,
              name,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.baseUrl ?? value;
          }
          if (errors.baseUrl?.hasError) {
            runValidationTasks("baseUrl", value);
          }
          setBaseUrl(value);
        }}
        onBlur={() => runValidationTasks("baseUrl", baseUrl)}
        errorMessage={errors.baseUrl?.errorMessage}
        hasError={errors.baseUrl?.hasError}
        {...getOverrideProps(overrides, "baseUrl")}
      ></TextField>
      <TextField
        label="Public ip"
        isRequired={false}
        isReadOnly={false}
        value={publicIP}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP: value,
              encoding,
              version,
              userEmail,
              name,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.publicIP ?? value;
          }
          if (errors.publicIP?.hasError) {
            runValidationTasks("publicIP", value);
          }
          setPublicIP(value);
        }}
        onBlur={() => runValidationTasks("publicIP", publicIP)}
        errorMessage={errors.publicIP?.errorMessage}
        hasError={errors.publicIP?.hasError}
        {...getOverrideProps(overrides, "publicIP")}
      ></TextField>
      <TextField
        label="Encoding"
        isRequired={true}
        isReadOnly={false}
        value={encoding}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding: value,
              version,
              userEmail,
              name,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.encoding ?? value;
          }
          if (errors.encoding?.hasError) {
            runValidationTasks("encoding", value);
          }
          setEncoding(value);
        }}
        onBlur={() => runValidationTasks("encoding", encoding)}
        errorMessage={errors.encoding?.errorMessage}
        hasError={errors.encoding?.hasError}
        {...getOverrideProps(overrides, "encoding")}
      ></TextField>
      <TextField
        label="Version"
        isRequired={true}
        isReadOnly={false}
        value={version}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding,
              version: value,
              userEmail,
              name,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.version ?? value;
          }
          if (errors.version?.hasError) {
            runValidationTasks("version", value);
          }
          setVersion(value);
        }}
        onBlur={() => runValidationTasks("version", version)}
        errorMessage={errors.version?.errorMessage}
        hasError={errors.version?.hasError}
        {...getOverrideProps(overrides, "version")}
      ></TextField>
      <TextField
        label="User email"
        isRequired={true}
        isReadOnly={false}
        value={userEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding,
              version,
              userEmail: value,
              name,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.userEmail ?? value;
          }
          if (errors.userEmail?.hasError) {
            runValidationTasks("userEmail", value);
          }
          setUserEmail(value);
        }}
        onBlur={() => runValidationTasks("userEmail", userEmail)}
        errorMessage={errors.userEmail?.errorMessage}
        hasError={errors.userEmail?.hasError}
        {...getOverrideProps(overrides, "userEmail")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding,
              version,
              userEmail,
              name: value,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding,
              version,
              userEmail,
              name,
              description: value,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Ecs task name"
        isRequired={false}
        isReadOnly={false}
        value={ecsTaskName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding,
              version,
              userEmail,
              name,
              description,
              ecsTaskName: value,
              status,
            };
            const result = onChange(modelFields);
            value = result?.ecsTaskName ?? value;
          }
          if (errors.ecsTaskName?.hasError) {
            runValidationTasks("ecsTaskName", value);
          }
          setEcsTaskName(value);
        }}
        onBlur={() => runValidationTasks("ecsTaskName", ecsTaskName)}
        errorMessage={errors.ecsTaskName?.errorMessage}
        hasError={errors.ecsTaskName?.hasError}
        {...getOverrideProps(overrides, "ecsTaskName")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding,
              version,
              userEmail,
              name,
              description,
              ecsTaskName,
              status: value,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || serverModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || serverModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
