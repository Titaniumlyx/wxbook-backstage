<template>
  <div class="container">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column label="图书封面">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column label="书名" prop="title">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row._id)">查看编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" icon="el-icon-arrow-left" @click="handleReduce">上一页</el-button>
    <el-button type="primary" @click="handleAdd">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        tableData: [],
        params: {
          pn: 1,
          size: 2
        }
      }
    },
    methods: {
      async getData(){
        const res = await this.$axios.get('/swiper', this.params)
        // console.log(res);
        this.tableData = res.data
      },
      handleEdit(id){
        this.$router.push({name: 'editSwiper', query: {id}})
      },
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
        this.$axios.get('/swiper', this.params).then(res => {
          // console.log(res);
          if(res.data.length === 0){
            this.params.pn -= 1
            this.$message({
              showClose: true,
              message: '最后一页咯'
            });
          }else{
            this.tableData = res.data
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
  .user-avatar{
    display: block;
    width: 82px;
    height: 105px;
    box-sizing: border-box;
  }
</style>

