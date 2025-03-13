<script setup lang="tsx">
import { ref } from 'vue';

const options = ref([
  {
    label: '男',
    value: '1'
  },
  {
    label: '女',
    value: '2'
  }
]);

const selectOptions = ref([
  {
    value1: '1',
    label1: '小学'
  },
  {
    value1: '2',
    label1: '初中'
  },
  {
    value1: '3',
    label1: '高中'
  },
  {
    value1: '4',
    label1: '大专',
    render: (item) => {
      return <div>{item.label1} render 函数</div>
    }
  }
])

const model = ref({
  username: '',
  sex: '',
  education: ''
});

const theme = ref('button');

const label = () => <div>HelloLabel</div>;

const rres = ref();

setTimeout(() => {
  theme.value = 'border';
  options.value.push({ label: '外星人', value: '3' });
  selectOptions.value.push({label1: '本科', value1: '5'});
  rres.value.resetData();
}, 3000)

const rules = [
  { required: true, message: '请输入用户名' }
];

function getRadioData() {
  return Promise.resolve(options.value);
}

function handleChange(value, item) {
  console.log('value', value);
  console.log('item', item);
}

const loadingRender = () => <div>
  asdasd
</div>
</script>

<template>
  <div>
    {{ model }} {{ options }}
    <el-form :model="model">
      <ProFormText prefix-icon="hahahha" name="username" :label="label" v-model="model.username">

      </ProFormText>

      <ProFormRadio ref="rres" direction="row" @radio-change="handleChange" label="性别" name="sex" :data="getRadioData"
        v-model="model.sex">
      </ProFormRadio>

      <ProFormSelect :loadingRender :data="selectOptions" key-name="label1" value-name="value1" label="学历" name="education" v-model="model.education">
        <template #option-3="{option}">
          <div>
            {{ option.label1 }} 插槽形式
          </div>
        </template>
      </ProFormSelect>
    </el-form>
  </div>
</template>

<style scoped></style>
