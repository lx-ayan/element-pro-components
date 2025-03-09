import { VNode, VNodeChild } from "vue";

export type VueNode = VNode | VNodeChild | (() => VNode);

export type WithFalse<T extends any = any> = T | false;

export type PromiseFunction<T> = (...args: any[]) => Promise<T>;

export type StringOrVueNode = string | VueNode | (() => VueNode);

export interface OptionData {
    label: string,
    value: any,
    span?: number;
    disabled?: boolean;
    render?: (item: any) => VueNode;
}

export type RequestOptionData = () => Promise<OptionData[]>;

export type FormOptionData = Array<OptionData> | RequestOptionData | Array<any>;

export type BasicType = string | number | boolean;