import useOptionData from "@pro-components-element-plus/hooks/useOptionData";
import useVModel from "@pro-components-element-plus/hooks/useVModel";
import { FormOptionData, getSlotOrJSX, StringOrVueNode } from "@pro-components-element-plus/utils";
import { ElFormItem, ElOption, ElSelect, FormItemProps, FormItemRule, RadioProps } from "element-plus";
import { SelectProps } from "element-plus/es/components/select/src/select";
import { Arrayable } from "element-plus/es/utils";
import { defineComponent, PropType } from "vue";

const ProFormSelect = defineComponent({
    name: 'ProFormSelect',
    props: {
        // About Pro
        data: {
            type: [Array, Function] as PropType<FormOptionData>,
            default: () => []
        },
        keyName: {
            type: String,
            default: 'label'
        },
        valueName: {
            type: String,
            default: 'value'
        },
        // About Form
        name: {
            type: String,
            required: true
        },
        rules: {
            type: Object as PropType<Arrayable<FormItemRule>>
        },
        label: [String, Object, Function] as PropType<StringOrVueNode>,
        formItemProps: Object as PropType<FormItemProps>,
        modelValue: String,
        // About select
        disabled: Boolean,
        placeholder: {
            type: String,
            default: '请选择'
        },
        size: String as PropType<RadioProps['size']>,
        textColor: String,
        selectProps: SelectProps
    },
    setup(props, ctx) {
        const { slots, expose, emit } = ctx;
        const innerValue = useVModel('modelValue', props, emit);
        const { innerOption, reset } = useOptionData(props, slots);


        expose({
            resetData: () => {
                reset(props.data, props.keyName, props.valueName).then((res: OptionData[]) => {
                    innerOption.value = res.map(item => {
                        return {
                            ...item,
                            render: (current: any) => item.render ? item.render(current) : slots[`option-${item[props.valueName]}`] ? slots[`option-${item[props.valueName]}`]({ option: item }) : item[props.keyName]
                        }
                    });
                });
            }
        })

        return () => <ElFormItem prop={props.name}>
            {
                {
                    label: getSlotOrJSX<typeof props>('label', slots, props),
                    default: () => <ElSelect placeholder={props.placeholder} v-model={innerValue.value}>
                        {
                            innerOption.value.map(item => (
                                <ElOption key={item.value} value={item.value} label={item.label}>
                                    {item.render(item)}
                                </ElOption>
                            ))
                        }
                    </ElSelect>
                }
            }
        </ElFormItem>
    }
});

export default ProFormSelect;