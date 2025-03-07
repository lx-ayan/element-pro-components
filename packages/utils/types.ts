import { VNode, VNodeChild } from "vue";

export type VueNode = VNode | VNodeChild | (() => VNode);

export type WithFalse<T extends any = any> = T | false;

export type PromiseFunction<T> = (...args: any[]) => Promise<T>;