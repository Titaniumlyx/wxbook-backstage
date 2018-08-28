<template>
  <div class="container">
    <el-table
      :data="allBook"
      border
      style="width: 100%">
      <el-table-column label="书本">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="category-icon">
        </template>
      </el-table-column>
      <el-table-column label="书名" prop="title">
      </el-table-column>
      <el-table-column label="作者" prop="author">
      </el-table-column>
      <el-table-column label="时间" prop="updateTime">
      </el-table-column>
      <!--<el-table-column label="描述" prop="desc">-->
      <!--</el-table-column>-->
    </el-table>
    <!--<el-pagination-->
      <!--@current-change="handleCurrentChange"-->
      <!--layout="prev, next"-->
    <!--&gt;-->
    <!--</el-pagination>-->
    <el-button type="primary" icon="el-icon-arrow-left" @click="handleReduce">上一页</el-button>
    <el-button type="primary" @click="handleAdd">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </div>
</template>

<script>
  export default {
    name: "bookList",
    data(){
      return{
        allBook: [],
        params:{
          pn: 1,
          size: 2
        }
      }
    },
    methods: {
      getData(){
        const id = this.$route.query.id
        this.$axios.get(`/category/${id}/books`, this.params).then(res => {
          // console.log(res);
          this.allBook = res.data.books
        })
      },
      // handleCurrentChange(val){
      //   this.pn = val
      //   this.getData()
      // }
      handleReduce(){
        this.params.pn -= 1
        if(this.params.pn <= 0){
          this.params.pn =1
          this.getData()
          this.$message({
            showClose: true,
            message: '这是第一页哦'
          });
        }
        this.getData()
      },
      handleAdd(){
        this.params.pn += 1
        const id = this.$route.query.id
        this.$axios.get(`/category/${id}/books`, this.params).then(res => {
          // console.log(res);
          if(res.data.books.length === 0){
            this.params.pn -= 1
            this.$message({
              showClose: true,
              message: '最后一页咯'
            });
          }else{
            this.allBook = res.data.books
          }
        })
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .category-icon{
    display: block;
    width: 70px;
    height: 95px;
  }

    /*.cell{
      width: 200px;
      height: 150px;
      overflow: hidden;
    }*/
    /*display: block;
    width: 200px;
    height: 150px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;*/
</style>
