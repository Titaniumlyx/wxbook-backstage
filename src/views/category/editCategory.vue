<template>
  <div class="container">
    <el-form label-position="top" label-width="80px" :model="formDatas">
      <el-form-item label="类别名:">
        <el-input v-model="formDatas.title" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="类别图片:">
        <img :src="formDatas.icon">
      </el-form-item>
      <el-form-item label="类别排序:">
        <el-input-number v-model="formDatas.index" :min="1" :max="50" label="数字越大越靠前"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="btnItem"
          @click="handleSubmit"
        >提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "editCategory",
      data(){
        return{
          formDatas: {
            title: '',
            icon: '',
            index: ''
          }
        }
      },
      methods: {
        async getData(){
          const id = this.$route.query.id
          try {
            const res = await this.$axios.get(`/category/${id}`)
            // console.log(res);
            this.formDatas = res.data
          }catch (err) {
            alert(err);
          }
        },
        async handleSubmit(){
          const id = this.$route.query.id
          const res = await this.$axios.put(`/category/${id}`, this.formDatas)
          // console.log(res);
          if(res.code === 200){
            this.$message.success(res.msg)
            setTimeout(() => {
              this.$router.push('/layout/categoryList')
            }, 1000)
          }else{
            this.$message.error(res.msg)
          }
        }
      },
      created(){
        this.getData()
      }
    }
</script>

<style scoped lang="scss">
  .container{
    padding: 20px;
    .nameInput{
      width: 500px;
    }
  }
</style>
