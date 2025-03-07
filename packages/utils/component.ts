import { isFunction } from "lodash-es";

export function getSlotOrJSX<T = Object>(key: keyof T, slots: any, props: T) {
    return () => slots[key] ? slots[key as string]() : (isFunction(props[key]) ? props[key]() : props[key])
}