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
import { createServer } from "./graphql/mutations";
const client = generateClient();
export default function ServerCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    encoding: "",
    version: "",
    userEmail: "",
    name: "",
    description: "",
    ec2Id: "",
    status: "",
  };
  const [configuration, setConfiguration] = React.useState(
    initialValues.configuration
  );
  const [baseUrl, setBaseUrl] = React.useState(initialValues.baseUrl);
  const [encoding, setEncoding] = React.useState(initialValues.encoding);
  const [version, setVersion] = React.useState(initialValues.version);
  const [userEmail, setUserEmail] = React.useState(initialValues.userEmail);
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [ec2Id, setEc2Id] = React.useState(initialValues.ec2Id);
  const [status, setStatus] = React.useState(initialValues.status);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setConfiguration(initialValues.configuration);
    setBaseUrl(initialValues.baseUrl);
    setEncoding(initialValues.encoding);
    setVersion(initialValues.version);
    setUserEmail(initialValues.userEmail);
    setName(initialValues.name);
    setDescription(initialValues.description);
    setEc2Id(initialValues.ec2Id);
    setStatus(initialValues.status);
    setErrors({});
  };
  const validations = {
    configuration: [{ type: "JSON" }],
    baseUrl: [],
    encoding: [],
    version: [],
    userEmail: [{ type: "Email" }],
    name: [],
    description: [],
    ec2Id: [],
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
          configuration,
          baseUrl,
          encoding,
          version,
          userEmail,
          name,
          description,
          ec2Id,
          status,
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
            query: createServer.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ServerCreateForm")}
      {...rest}
    >
      <TextAreaField
        label="Configuration"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration: value,
              baseUrl,
              encoding,
              version,
              userEmail,
              name,
              description,
              ec2Id,
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
              encoding,
              version,
              userEmail,
              name,
              description,
              ec2Id,
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
        label="Encoding"
        isRequired={false}
        isReadOnly={false}
        value={encoding}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              encoding: value,
              version,
              userEmail,
              name,
              description,
              ec2Id,
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
        isRequired={false}
        isReadOnly={false}
        value={version}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              encoding,
              version: value,
              userEmail,
              name,
              description,
              ec2Id,
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
        isRequired={false}
        isReadOnly={false}
        value={userEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              encoding,
              version,
              userEmail: value,
              name,
              description,
              ec2Id,
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
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              encoding,
              version,
              userEmail,
              name: value,
              description,
              ec2Id,
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
              encoding,
              version,
              userEmail,
              name,
              description: value,
              ec2Id,
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
        label="Ec2 id"
        isRequired={false}
        isReadOnly={false}
        value={ec2Id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              encoding,
              version,
              userEmail,
              name,
              description,
              ec2Id: value,
              status,
            };
            const result = onChange(modelFields);
            value = result?.ec2Id ?? value;
          }
          if (errors.ec2Id?.hasError) {
            runValidationTasks("ec2Id", value);
          }
          setEc2Id(value);
        }}
        onBlur={() => runValidationTasks("ec2Id", ec2Id)}
        errorMessage={errors.ec2Id?.errorMessage}
        hasError={errors.ec2Id?.hasError}
        {...getOverrideProps(overrides, "ec2Id")}
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
              encoding,
              version,
              userEmail,
              name,
              description,
              ec2Id,
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
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
