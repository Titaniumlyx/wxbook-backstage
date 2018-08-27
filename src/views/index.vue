<template>
    <div class="container">
      <div class="word">
        欢迎来到后台管理系统
      </div>
      <h2>父组件的值：{{stars}}</h2>
      <!--<star :value="9"></star>-->
      <star v-model="stars"></star>
    </div>
</template>

<script>
  import star from '../components/star'

  export default {
    name: "index",
    data(){
      return{
        stars: 5
      }
    },
    components: {
      star
    }
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
