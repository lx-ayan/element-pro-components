import useVModel from "@pro-components-element-plus/hooks/useVModel";
import { BasicType, FormOptionData, getSlotOrJSX, OptionData, StringOrVueNode } from "@pro-components-element-plus/utils";
import { ElFormItem, ElRadio, ElRadioButton, ElRadioGroup, FormItemProps, FormItemRule, ItemSize, RadioButtonProps, RadioGroupProps, RadioProps } from "element-plus";
import { Arrayable } from "element-plus/es/utils";
import { isFunction } from "lodash-es";
import { defineComponent, onMounted, PropType, ref, watch } from "vue";

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
        size: String as PropType<RadioProps['size']>,
        textColor: String,
        radioGroupProps: Object as PropType<RadioGroupProps>,
        radioItemProps: Object as PropType<RadioProps | RadioButtonProps>
    },
    setup: (props, attrs) => {
        const { emit, slots, expose } = attrs;

        const innerValue = useVModel('modelValue', props, emit);
        const innerOption = ref<OptionData[]>([]);

        onMounted(() => {
            buildData();
        });

        watch(() => props.data, () => {
            buildData();
        }, { deep: true });

        function buildData() {
            if (isFunction(props.data)) {
                props.data().then(res => {
                    innerOption.value = res.map((item: any) => ({
                        label: item[props.keyName],
                        value: item[props.valueName],
                        disabled: item.disabled,
                        render: (current: any) => item.render ? item.render(current) : slots[`option-${item[props.valueName]}`] ? slots[`option-${item[props.valueName]}`]({ option: item }) : item[props.keyName]
                    }))
                })
            } else {
                innerOption.value = props.data.map((item: any) => ({
                    label: item[props.keyName],
                    value: item[props.valueName],
                    disabled: item.disabled,
                    render: (current: any) => item.render ? item.render(current) : slots[`option-${item[props.valueName]}`] ? slots[`option-${item[props.valueName]}`]({ option: item }) : item[props.keyName]
                }))
            }
        }

        const RenderDefault = () => <>
            {
                innerOption.value.map(item => {
                    return <ElRadio size={props.size} disabled={item.disabled} value={item[props.valueName]} key={item[props.valueName]}>
                        {item.render(item)}
                    </ElRadio>
                })
            }
        </>

        const RenderBorder = () => <>
            {
                innerOption.value.map(item => {
                    return <ElRadio size={props.size} border={true} disabled={item.disabled} value={item[props.valueName]} key={item[props.valueName]}>
                        {item.render(item)}
                    </ElRadio>
                })
            }
        </>

        const RenderButton = () => <>
            {
                innerOption.value.map(item => {
                    return <ElRadioButton size={props.size} disabled={item.disabled} value={item[props.valueName]} key={item[props.valueName]}>
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

        return () => <ElFormItem prop={props.name}>
            {
                {
                    label: getSlotOrJSX<typeof props>('label', slots, props),
                    default: () => <ElRadioGroup {...props.radioGroupProps} onChange={handleChange} text-color={props.textColor} v-model={innerValue.value}>
                        <RenderInstance />
                    </ElRadioGroup>
                }
            }
        </ElFormItem>
    }
});

export default ProFormRadioProps;