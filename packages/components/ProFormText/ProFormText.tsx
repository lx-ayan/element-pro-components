import { defineComponent, PropType, readonly } from "vue";
import { ElInput, ElFormItem, FormItemRule, FormItemProps, InputProps } from 'element-plus';
import useVModel from "@pro-components-element-plus/hooks/useVModel";
import { isString } from "lodash-es";
import { FORM_EMPTY_PLACEHOLDER, getSlotOrJSX, VueNode } from "@pro-components-element-plus/utils";
import { Arrayable } from "element-plus/es/utils";

const ProFormText = defineComponent({
    name: "ProFormText",
    props: {
        name: {
            type: String,
            required: true
        },
        rules: {
            type: Object as PropType<Arrayable<FormItemRule>>
        },
        label: [String, Object, Function] as PropType<string | VueNode | (() => VueNode)>,
        formItemRule: Object as PropType<FormItemProps>,
        placeholder: {
            type: String,
            default: '请输入'
        },
        modelValue: String,
        disabled: Boolean,
        readonly: Boolean,
        type: String,
        clearable: Boolean,
        prefixIcon: [String, Object, Function] as PropType<string | VueNode | (() => VueNode)>,
        suffixIcon: [String, Object, Function] as PropType<string | VueNode | (() => VueNode)>,
        prepend: [String, Object, Function] as PropType<string | VueNode | (() => VueNode)>,
        append: [String, Object, Function] as PropType<string | VueNode | (() => VueNode)>,
        inputProps: Object as PropType<InputProps>
    },
    setup(props, attrs) {
        const { emit, slots, expose } = attrs;

        //@ts-ignore
        const innerValue = useVModel<typeof props>('modelValue', props, emit);

        const placeholder = `${props.placeholder}${isString(props.label) ? props.label : FORM_EMPTY_PLACEHOLDER}`;

        expose({
            clear: () => {
                innerValue.value = '';
            }
        })

        return () => <ElFormItem prop={props.name} rules={props.rules} {...props.formItemRule}>
            {
                {
                    label: getSlotOrJSX<typeof props>('label', slots, props),
                    default: () => <ElInput prefix-icon="hello" clearable={props.clearable}
                        type={props.type}
                        disabled={props.disabled}
                        readonly={props.readonly}
                        v-model={innerValue.value}
                        placeholder={placeholder}
                        {...props.inputProps}
                    >
                        {{
                            prefix: getSlotOrJSX<typeof props>('prefixIcon', slots, props),
                            suffix: getSlotOrJSX<typeof props>('suffixIcon', slots, props),
                            prepend: getSlotOrJSX<typeof props>('prepend', slots, props),
                            append: getSlotOrJSX<typeof props>('append', slots, props),
                        }}
                    </ElInput>
                }
            }
        </ElFormItem>
    },
});

export default ProFormText;