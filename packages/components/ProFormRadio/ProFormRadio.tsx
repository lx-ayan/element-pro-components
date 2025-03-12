import useOptionData from "@pro-components-element-plus/hooks/useOptionData";
import useVModel from "@pro-components-element-plus/hooks/useVModel";
import { BasicType, FormOptionData, getSlotOrJSX, OptionData, StringOrVueNode } from "@pro-components-element-plus/utils";
import { ElCol, ElFormItem, ElRadio, ElRadioButton, ElRadioGroup, ElRow, FormItemProps, FormItemRule, ItemSize, RadioButtonProps, RadioGroupProps, RadioProps } from "element-plus";
import { Arrayable } from "element-plus/es/utils";
import { defineComponent, PropType } from "vue";

const ProFormRadioProps = defineComponent({
    name: 'ProFormRadio',
    props: {
        // About Pro
        theme: {
            type: String as PropType<'border' | 'button' | 'default'>,
            default: 'default'
        },
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
        direction: {
            type: String as PropType<'row' | 'vertical'>,
            default: 'row'
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
        // About Radio
        disabled: Boolean,
        size: String as PropType<RadioProps['size']>,
        textColor: String,
        radioGroupProps: Object as PropType<RadioGroupProps>,
        radioProps: Object as PropType<RadioProps | RadioButtonProps>
    },
    setup: (props, ctx) => {
        const { emit, slots, expose } = ctx;

        const innerValue = useVModel('modelValue', props, emit);
        let { innerOption, reset } = useOptionData(props, slots);

        const RenderDefault = () => <>
            {
                innerOption.value.map(item => {
                    return props.direction === 'vertical' ? <ElCol>
                        <ElRadio size={props.size} disabled={props.disabled || item.disabled} value={item[props.valueName]} {...props.radioProps}>
                            {item.render(item)}
                        </ElRadio>
                    </ElCol> : <ElRadio size={props.size} disabled={props.disabled || item.disabled} value={item[props.valueName]} {...props.radioProps}>
                        {item.render(item)}
                    </ElRadio>
                })
            }
        </>

        const RenderBorder = () => <>
            {
                innerOption.value.map(item => {
                    return props.direction === 'vertical' ? <ElCol>
                        <ElRadio size={props.size} border={true} disabled={props.disabled || item.disabled} value={item[props.valueName]} key={item[props.valueName]} {...props.radioProps}>
                            {item.render(item)}
                        </ElRadio>
                    </ElCol> :
                        <ElRadio size={props.size} border={true} disabled={props.disabled || item.disabled} value={item[props.valueName]} key={item[props.valueName]} {...props.radioProps}>
                            {item.render(item)}
                        </ElRadio>
                })
            }
        </>

        const RenderButton = () => <>
            {
                innerOption.value.map(item => {
                    return props.direction === 'vertical' ? <ElCol>
                        <ElRadioButton size={props.size} disabled={props.disabled || item.disabled} value={item[props.valueName]} key={item[props.valueName]} {...props.radioProps}>
                            {item.render(item)}
                        </ElRadioButton>
                    </ElCol> :
                        <ElRadioButton size={props.size} disabled={props.disabled || item.disabled} value={item[props.valueName]} key={item[props.valueName]} {...props.radioProps}>
                            {item.render(item)}
                        </ElRadioButton>

                })
            }
        </>

        const RenderInstance = () => {
            switch (props.theme) {
                case 'default':
                default:
                    return <RenderDefault />
                case 'button':
                    return <RenderButton />
                case 'border':
                    return <RenderBorder />
            }
        }

        function handleChange(value: BasicType) {
            const item = innerOption.value.find(item => item.value == value);
            emit('radio-change', value, item);
        }

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

        return () => <ElFormItem prop={props.name} rules={props.rules} {...props.formItemProps}>
            {
                {
                    label: getSlotOrJSX<typeof props>('label', slots, props),
                    default: () => <ElRow>
                        <ElRadioGroup {...props.radioGroupProps} onChange={handleChange} text-color={props.textColor} v-model={innerValue.value}>
                            <RenderInstance />
                        </ElRadioGroup>
                    </ElRow>
                }
            }
        </ElFormItem>
    }
});

export default ProFormRadioProps;