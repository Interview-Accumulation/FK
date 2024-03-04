<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import BarChart from './BarChart.vue'
import {Tree} from 'ant-design-vue'
import {RouterView, RouterLink} from 'vue-router'

defineProps({
  msg: String,
})

const onCollapse = (collapsed, type) => {
  console.log(collapsed, type);
};
const onBreakpoint = broken => {
  console.log(broken);
};
const selectedKeys = ref(['1']);
</script>

<template>
  <a-layout>
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      :style="{ height: '100vh' }"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <RouterLink to="/about">
            <span class="nav-text">about</span>
          </RouterLink>
        </a-menu-item>
        <a-menu-item key="2">
          <RouterLink to="/user">
            <span class="nav-text">user</span>
          </RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        header11
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 10px' }">
        <a-layout class="content-wrap">
          <RouterView />
        </a-layout>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}

.content-wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
}



</style>
