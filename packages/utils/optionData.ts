import { isArray, isFunction } from "lodash-es";
import { FormOptionData, OptionData } from "./types";

export function buildData(data: FormOptionData, keyName: string = 'label', valueName: string = 'value'): Promise<Array<OptionData>> {
    return new Promise((resolve, reject) => {
        if (!isFunction(data) && !isArray(data)) resolve([]);
        if (isFunction(data)) {
            data().then(res => {
                const result = res.map((item: any) => ({
                    label: item[keyName],
                    value: item[valueName],
                    disabled: item.disabled,
                    render: item.render
                }));
                resolve(result);
            })
        } else {
            const result = data.map((item: any) => ({
                ...item,
                label: item[keyName],
                value: item[valueName],
                disabled: item.disabled,
                render: item.render
            }));
            resolve(result);
        }
    });
}