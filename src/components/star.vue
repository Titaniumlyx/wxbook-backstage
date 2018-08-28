<template>
    <div class="container">
      <ul class="clearfix allStar">
        <li
          class="starImg"
          v-for="(item,index) in 10"
          :class="{
          'rightStar' : index%2===1,
          'activeStar' : currentNum>index
          }"
          @mouseover="mouseOvers(index)"
          @click="handleFreeze(index)"
        ></li>
      </ul>
      <div class="score">
        <span>你的评分是: {{isSelectNum}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "star",
    props: {    // 父子组件传值
      value: {
        type: Number,
        default: 0
      },
      isCan: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return{
        currentNum: this.value,
        isSelect: this.isCan,
        isSelectNum: this.value
      }
    },
    methods: {
      mouseOvers(index){
        if(this.isSelect){
          this.currentNum = index + 1
        }
      },
      handleFreeze(index){
        if(this.isSelect){
          this.isSelectNum = index + 1;
          this.$emit('input', index + 1)
          this.isSelect = false
        }
      }
    },
    watch: {
      value(val){
        this.currentNum = val
        this.isSelectNum = val
      }
    },
    // created(){
    //   // console.log(this.value);
    //   if(this.value){
    //     this.isSelect = false
    //   }
    // }
  }
</script>

<style scoped lang="scss">
  li{
    list-style: none;
  }
  .allStar{
    margin-top: 160px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .starImg{
    float: left;
    width: 15px;
    height: 29px;
    background: url('../assets/imgs/star-off.png') no-repeat;
  }
  li.rightStar{
    background-position: -15px 0;
  }
  /* background 里面包含有position 的属性，如果写在前面，后面写个background ，会覆盖住前面写的position 。解决方法：
  1. 样式写在background 的后面
  2. 给样式加 !important
  3. 给样式前面加上标签，增加优先级
  4. 把 background 改为 background-image。
  */
  .activeStar{
    background: url('../assets/imgs/star-on.png') no-repeat;
  }
  .score{
    margin-top: 200px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
