<template>
  <nav>
    <router-link :to="{ name: 'Home' }">首页</router-link>
    <router-link :to="{ name: 'About' }">关于</router-link>
  </nav>
  <router-view></router-view>
</template>