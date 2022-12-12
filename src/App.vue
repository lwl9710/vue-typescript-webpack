<template>
  <h1 class="title">
    <span>{{ message }}</span>
  </h1>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  const message = ref("Hello world!");
</script>
<style lang="scss" scoped>
  .title {
    transform: translateX(30px);
    span {
      color: skyblue;
    }
  }
</style>