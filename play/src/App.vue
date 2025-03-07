<script setup lang="tsx">
import { ref } from 'vue';

const state = ref('Hello ProFormText');

const label = () => <div>HelloLabel</div>;

const rules = [
  {required: true, message: '请输入用户名'}
];
</script>

<template>
  <div>
    {{ state }}
    <ProFormText prefix-icon="hahahha" name="username" :label="label" v-model="state">

    </ProFormText>
  </div>
</template>

<style scoped></style>
