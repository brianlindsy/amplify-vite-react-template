/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
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
    publicIP: "",
    encoding: "",
    version: "",
    implementationGuide: "",
    implementationGuideVersion: "",
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
  const [implementationGuide, setImplementationGuide] = React.useState(
    initialValues.implementationGuide
  );
  const [implementationGuideVersion, setImplementationGuideVersion] =
    React.useState(initialValues.implementationGuideVersion);
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
    setConfiguration(initialValues.configuration);
    setBaseUrl(initialValues.baseUrl);
    setPublicIP(initialValues.publicIP);
    setEncoding(initialValues.encoding);
    setVersion(initialValues.version);
    setImplementationGuide(initialValues.implementationGuide);
    setImplementationGuideVersion(initialValues.implementationGuideVersion);
    setUserEmail(initialValues.userEmail);
    setName(initialValues.name);
    setDescription(initialValues.description);
    setEcsTaskName(initialValues.ecsTaskName);
    setStatus(initialValues.status);
    setErrors({});
  };
  const validations = {
    configuration: [{ type: "JSON" }],
    baseUrl: [],
    publicIP: [],
    encoding: [{ type: "Required" }],
    version: [{ type: "Required" }],
    implementationGuide: [],
    implementationGuideVersion: [],
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
          configuration,
          baseUrl,
          publicIP,
          encoding,
          version,
          implementationGuide,
          implementationGuideVersion,
          userEmail,
          name,
          description,
          ecsTaskName,
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
              publicIP,
              encoding,
              version,
              implementationGuide,
              implementationGuideVersion,
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
              implementationGuide,
              implementationGuideVersion,
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
              implementationGuide,
              implementationGuideVersion,
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
      <SelectField
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
              implementationGuide,
              implementationGuideVersion,
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
      >
        <option children="JSON" value="JSON" {...getOverrideProps(overrides, "statusOption0")}></option>
        <option children="XML" value="XML" {...getOverrideProps(overrides, "statusOption1")}></option>
      </SelectField>
      <SelectField
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
              implementationGuide,
              implementationGuideVersion,
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
      >
        <option children="DSTU2" value="DSTU2" {...getOverrideProps(overrides, "statusOption0")}></option>
        <option children="DSTU3" value="DSTU3" {...getOverrideProps(overrides, "statusOption1")}></option>
        <option children="R4" value="R4" {...getOverrideProps(overrides, "statusOption2")}></option>
        <option children="R5" value="R5" {...getOverrideProps(overrides, "statusOption3")}></option>
        
      </SelectField>
      <SelectField
        label="Implementation guide"
        isRequired={false}
        isReadOnly={false}
        value={implementationGuide}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding,
              version,
              implementationGuide: value,
              implementationGuideVersion,
              userEmail,
              name,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.implementationGuide ?? value;
          }
          if (errors.implementationGuide?.hasError) {
            runValidationTasks("implementationGuide", value);
          }
          setImplementationGuide(value);
        }}
        onBlur={() =>
          runValidationTasks("implementationGuide", implementationGuide)
        }
        errorMessage={errors.implementationGuide?.errorMessage}
        hasError={errors.implementationGuide?.hasError}
        {...getOverrideProps(overrides, "implementationGuide")}
      >
        <option children="None" value="" {...getOverrideProps(overrides, "statusOption0")}></option>
        <option children="US Core" value="hl7.fhir.us.core" {...getOverrideProps(overrides, "statusOption1")}></option>
      </SelectField>
      <SelectField
        label="Implementation guide version"
        isRequired={false}
        isReadOnly={false}
        value={implementationGuideVersion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              configuration,
              baseUrl,
              publicIP,
              encoding,
              version,
              implementationGuide,
              implementationGuideVersion: value,
              userEmail,
              name,
              description,
              ecsTaskName,
              status,
            };
            const result = onChange(modelFields);
            value = result?.implementationGuideVersion ?? value;
          }
          if (errors.implementationGuideVersion?.hasError) {
            runValidationTasks("implementationGuideVersion", value);
          }
          setImplementationGuideVersion(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "implementationGuideVersion",
            implementationGuideVersion
          )
        }
        errorMessage={errors.implementationGuideVersion?.errorMessage}
        hasError={errors.implementationGuideVersion?.hasError}
        {...getOverrideProps(overrides, "implementationGuideVersion")}
      >
        <option children="None" value="" {...getOverrideProps(overrides, "statusOption0")}></option>
        <option children="7.0.0" value="7.0.0" {...getOverrideProps(overrides, "statusOption1")}></option>
      </SelectField>
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
              implementationGuide,
              implementationGuideVersion,
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
              implementationGuide,
              implementationGuideVersion,
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
              implementationGuide,
              implementationGuideVersion,
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
              implementationGuide,
              implementationGuideVersion,
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
              implementationGuide,
              implementationGuideVersion,
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
