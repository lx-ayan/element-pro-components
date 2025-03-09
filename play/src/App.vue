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

const model = ref({
  username: '',
  sex: ''
});

const theme = ref('button');

const label = () => <div>HelloLabel</div>;

// setTimeout(() => {
//   theme.value = 'border';
// }, 3000)

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
</script>

<template>
  <div>
    {{ model }}
    <el-form :model="model">
      <ProFormText prefix-icon="hahahha" name="username" :label="label" v-model="model.username">

      </ProFormText>

      <ProFormRadio @radio-change="handleChange" label="性别" name="sex" :data="getRadioData" v-model="model.sex">
      </ProFormRadio>
    </el-form>
  </div>
</template>

<style scoped></style>
