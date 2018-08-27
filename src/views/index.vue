<template>
    <div class="container">
      <div class="word">
        欢迎来到后台管理系统
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
  .container{
    position: relative;
  }
  .word{
    margin-top: 100px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: slategrey;
    font-size: 40px;
  }
</style>
