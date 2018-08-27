<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .fll{
    float: left;
  }
  .flr{
    float: right;
  }
  .clearfix{
    content: '';
    clear: both;
    display: block;
  }
</style>
