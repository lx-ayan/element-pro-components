import { FormOptionData, StringOrVueNode } from "@pro-components-element-plus/utils";
import { FormItemProps, FormItemRule, RadioButtonProps, RadioGroupProps, RadioProps } from "element-plus";
import { Arrayable } from "element-plus/es/utils";

export interface ProFormRadioProps {
    // about form
    name: string;
    modelValue: string | number;
    rules?: Arrayable<FormItemRule>;
    label?: StringOrVueNode;
    formItemProps: FormItemProps;
    // about radio
    disabled?: boolean;
    size?: RadioProps['size'];
    textColor?: string;
    radioGroupProps?: RadioGroupProps;
    radioProps?: RadioProps | RadioButtonProps;
    // about pro
    theme?: 'button' | 'border' | 'default';
    data: FormOptionData;
    keyName?: string;
    valueName?: string;
    direction?: 'row' | 'vertical';
}