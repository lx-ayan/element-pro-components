import { StringOrVueNode, VueNode } from "@pro-components-element-plus/utils";
import { FormItemProps, FormItemRule, InputProps } from "element-plus";
import { Arrayable } from "element-plus/es/utils";

export interface ProFormTextProps {
    name: string;
    modelValue: string | number;
    rules?: Arrayable<FormItemRule>;
    label?: StringOrVueNode;
    formItemProps: FormItemProps;
    disabled?: boolean;
    readonly?: boolean;
    type?: String;
    clearable?: boolean;
    prefixIcon?: StringOrVueNode;
    suffixIcon?: StringOrVueNode;
    append?: StringOrVueNode;
    prepend?: StringOrVueNode;
    inputProps?: InputProps;
}