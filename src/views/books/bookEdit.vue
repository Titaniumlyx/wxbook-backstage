<template>
  <div class="container">
    <el-form label-position="top" label-width="80px" :model="formDatas">
      <el-form-item label="图书标题:">
        <el-input v-model="formDatas.title" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="作者:">
        <el-input v-model="formDatas.author" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="书籍描述:">
        <el-input v-model="formDatas.desc" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="图书封面:">
        <uploadImg v-model="formDatas.img" style="float: left"></uploadImg>
        <span style="float: left" class="remark">点击图进行修改</span>
      </el-form-item>
      <el-form-item label="图书分类:">
        <el-select v-model="formDatas.type" placeholder="请选择">
          <el-option
            v-for="(item, index) in typeOptions"
            :key="index"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图书排序: (数字越大越靠前)">
        <el-input-number v-model="formDatas.index" :min="1" :max="50"></el-input-number>
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
  import uploadImg from '@/components/uploadImg'

  export default {
    components: {
      uploadImg
    },
    data(){
      return{
        formDatas: {
          title: '',
          author: '',
          img: '',
          desc: '',
          index: '',
          type: ''
        },
        typeOptions: []
      }
    },
    methods: {
      async getData(){
        const id = this.$route.query.id
        try {
          const res = await this.$axios.get(`/book/${id}`)
          // console.log(res.data);
          this.formDatas = res.data
        }catch (err) {
          alert(err);
        }
      },
      getCategory(){
        return new Promise(resolve => {
          this.$axios.get('/category').then(res => {
            this.typeOptions = res.data
            resolve()
          })
        })
      },
      async handleSubmit(){
        let params = {
          ...this.formDatas,
          book_id : this.$route.query.id
        }
        const res = await this.$axios.put('/book', params)
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
      this.getCategory().then(() => {
        this.getData()
      })
    }
  }
</script>

<style scoped lang="scss">
  .container{
    padding: 20px;
    .nameInput{
      width: 500px;
    }
    .remark{
      display: block;
      margin-left: 30px;
      margin-top: 15px;
      color: #aaa;
    }
  }
</style>
