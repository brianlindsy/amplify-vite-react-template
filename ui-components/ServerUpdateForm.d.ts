import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Server } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ServerUpdateFormInputValues = {
    configuration?: string;
    baseUrl?: string;
    publicIP?: string;
    encoding?: string;
    version?: string;
    implementationGuide?: string;
    implementationGuideVersion?: string;
    userEmail?: string;
    name?: string;
    description?: string;
    ecsTaskName?: string;
    status?: string;
};
export declare type ServerUpdateFormValidationValues = {
    configuration?: ValidationFunction<string>;
    baseUrl?: ValidationFunction<string>;
    publicIP?: ValidationFunction<string>;
    encoding?: ValidationFunction<string>;
    version?: ValidationFunction<string>;
    implementationGuide?: ValidationFunction<string>;
    implementationGuideVersion?: ValidationFunction<string>;
    userEmail?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    ecsTaskName?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ServerUpdateFormOverridesProps = {
    ServerUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    configuration?: PrimitiveOverrideProps<TextAreaFieldProps>;
    baseUrl?: PrimitiveOverrideProps<TextFieldProps>;
    publicIP?: PrimitiveOverrideProps<TextFieldProps>;
    encoding?: PrimitiveOverrideProps<TextFieldProps>;
    version?: PrimitiveOverrideProps<TextFieldProps>;
    implementationGuide?: PrimitiveOverrideProps<TextFieldProps>;
    implementationGuideVersion?: PrimitiveOverrideProps<TextFieldProps>;
    userEmail?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    ecsTaskName?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ServerUpdateFormProps = React.PropsWithChildren<{
    overrides?: ServerUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    server?: Server;
    onSubmit?: (fields: ServerUpdateFormInputValues) => ServerUpdateFormInputValues;
    onSuccess?: (fields: ServerUpdateFormInputValues) => void;
    onError?: (fields: ServerUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ServerUpdateFormInputValues) => ServerUpdateFormInputValues;
    onValidate?: ServerUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ServerUpdateForm(props: ServerUpdateFormProps): React.ReactElement;
