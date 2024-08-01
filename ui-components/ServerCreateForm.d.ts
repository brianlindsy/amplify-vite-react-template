import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ServerCreateFormInputValues = {
    configuration?: string;
    baseUrl?: string;
    encoding?: string;
    version?: string;
    userEmail?: string;
    name?: string;
    description?: string;
    ec2Id?: string;
    status?: string;
};
export declare type ServerCreateFormValidationValues = {
    configuration?: ValidationFunction<string>;
    baseUrl?: ValidationFunction<string>;
    encoding?: ValidationFunction<string>;
    version?: ValidationFunction<string>;
    userEmail?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    ec2Id?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ServerCreateFormOverridesProps = {
    ServerCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    configuration?: PrimitiveOverrideProps<TextAreaFieldProps>;
    baseUrl?: PrimitiveOverrideProps<TextFieldProps>;
    encoding?: PrimitiveOverrideProps<TextFieldProps>;
    version?: PrimitiveOverrideProps<TextFieldProps>;
    userEmail?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    ec2Id?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ServerCreateFormProps = React.PropsWithChildren<{
    overrides?: ServerCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ServerCreateFormInputValues) => ServerCreateFormInputValues;
    onSuccess?: (fields: ServerCreateFormInputValues) => void;
    onError?: (fields: ServerCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ServerCreateFormInputValues) => ServerCreateFormInputValues;
    onValidate?: ServerCreateFormValidationValues;
} & React.CSSProperties>;
export default function ServerCreateForm(props: ServerCreateFormProps): React.ReactElement;
