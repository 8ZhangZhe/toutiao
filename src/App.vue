<template>
  <div id="app">
    <h1>黑马头条项目</h1>
    <br>
    <i class="toutiao toutiao-dianzan1"></i>
    <br>
    <i class="toutiao toutiao-shoucang1"></i>
    <br>
    <hr>
    <TouTiao icon="wode" />
    <TouTiao icon="dianzan" />
    <TouTiao icon="guanbi" />
    <TouTiao icon="lishi" />
    <TouTiao icon="lishi" />
    <TouTiao icon="lishi" />

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less"></style>
