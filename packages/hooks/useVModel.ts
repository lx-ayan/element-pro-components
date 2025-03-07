import { onUnmounted, ref, watch } from "vue"

const useVModel = <T = Object>(key: keyof T, props: T, emits: any) => {
    const state = ref(props[key]);

    watch(state, (newValue) => {
        emits(`update:${key as string}`, newValue);
    });

    //@ts-ignore
    watch(() => props.key, (newValue) => {
        state.value = newValue;
    });

    onUnmounted(() => {
        state.value = null;
    })

    return state;
}

export default useVModel;