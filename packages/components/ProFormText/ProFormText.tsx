import { defineComponent } from "vue";
import { ElButton } from 'element-plus';

const ProFormText = defineComponent({
    name: "ProFormText",
    setup() {
        return () => <div><ElButton type="primary">  Hello</ElButton></div>;
    },
});

export default ProFormText;