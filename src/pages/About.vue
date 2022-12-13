<template>
  <h1>Welcome to {{ pageName }}.</h1>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  import { println } from "@/utils/print";
  const pageName = ref("about");
  println("Welcome to about.");
</script>