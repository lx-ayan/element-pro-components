import { FormOptionData, OptionData } from "@pro-components-element-plus/utils";
import { buildData } from "@pro-components-element-plus/utils/optionData";
import { onMounted, ref, watch } from "vue";

const useOptionData = (props: any, slots: any) => {

    const innerOption = ref<OptionData[]>([]);

    onMounted(() => {
        makeData();
    })

    function makeData() {
        buildData(props.data, props.keyName, props.valueName).then(res => {
            innerOption.value = res.map(item => {
                return {
                    ...item,
                    render: (current: any) => item.render ? item.render(current) : slots[`option-${item[props.valueName]}`] ? slots[`option-${item[props.valueName]}`]({ option: item }) : item[props.keyName]
                }
            });

        })
    }

    function reset(data: FormOptionData, keyName: string = 'label', valueName: string = 'value') {
        return new Promise((resolve) => {
            buildData(props.data, props.keyName, props.valueName).then(res => {
                resolve(res);
            })
        })
    }

    watch(() => props.data, () => {
        makeData();
    }, { deep: true });

    return { innerOption, reset };
}

export default useOptionData;