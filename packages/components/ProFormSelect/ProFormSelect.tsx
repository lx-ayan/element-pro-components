import { defineComponent, PropType } from "vue";
import useOptionData from "@pro-components-element-plus/hooks/useOptionData";
import useVModel from "@pro-components-element-plus/hooks/useVModel";
import { FormOptionData, getSlotOrJSX, OptionData, StringOrVueNode } from "@pro-components-element-plus/utils";
import { ElFormItem, ElOption, ElSelect, FormItemProps, FormItemRule, RadioProps } from "element-plus";
import { SelectProps } from "element-plus/es/components/select/src/select";
import { Arrayable } from "element-plus/es/utils";

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
        selectProps: Object as PropType<typeof SelectProps>,
        loadingRender: [String, Object, Function] as PropType<StringOrVueNode>,
        loading: Boolean,
        multiple: Boolean
    },
    setup: (props, ctx) => {
        const { slots, expose, emit } = ctx;
        const innerValue = useVModel('modelValue', props, emit);
        const { innerOption, reset } = useOptionData(props, slots);
        const innerLoading = useVModel<typeof props>('loading', props, emit);

        expose({
            resetData: () => {
                innerLoading.value = true;
                reset(props.data, props.keyName, props.valueName).then((res: OptionData[]) => {
                    innerOption.value = res.map(item => {
                        return {
                            ...item,
                            render: (current: any) => item.render ? item.render(current) : slots[`option-${item[props.valueName]}`] ? slots[`option-${item[props.valueName]}`]({ option: item }) : item[props.keyName]
                        }
                    });
                }).finally(() => {
                    innerLoading.value = false;
                });
            }
        })

        return () => <ElFormItem prop={props.name}>
            {
                {
                    label: getSlotOrJSX<typeof props>('label', slots, props),
                    default: () => <ElSelect multiple={props.multiple} loading={innerLoading.value} size={props.size} placeholder={props.placeholder} v-model={innerValue.value} {...props.selectProps}>
                        {
                            {
                                default: innerOption.value.map(item => (
                                    <ElOption key={item.value} value={item.value} label={item.label}>
                                        {item.render(item)}
                                    </ElOption>
                                )),
                                loading: props.loadingRender ? getSlotOrJSX<typeof props>('loadingRender', slots, props) : null,
                            }
                        }
                    </ElSelect>
                }
            }
        </ElFormItem>
    }
});

export default ProFormSelect;