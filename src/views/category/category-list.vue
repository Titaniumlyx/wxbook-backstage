<template>
  <div class="container">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column label="类别图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="category-icon">
        </template>
      </el-table-column>
      <el-table-column label="类别名" prop="title">
      </el-table-column>
      <el-table-column label="分类排序" prop="index">
      </el-table-column>
      <el-table-column label="基本操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="书本操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleCheck(scope.row._id)">查看图书</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleAddBook(scope.row._id)">添加图书</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "category-list",
      data(){
        return{
          tableData: []
        }
      },
      methods: {
        async getData(){
          const res = await this.$axios.get('/category')
          // console.log(res);
          this.tableData = res.data
        },
        handleEdit(id){
          this.$router.push({name: 'editCategory', query: {id}})
        },
        handleDelete(id){
          this.$confirm('此操作将永久删除该分类，请确认该分类下没有图书?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.delete(`/category/${id}`).then(res => {
              console.log(res);
              if(res.code === 200){
                this.$message.success(res.msg)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        },
        handleCheck(id){
          this.$router.push({name: 'bookList', query: {id}})
        },
        handleAddBook(id){
          this.$router.push({name: 'addBook', query: {id}})
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
    width: 80px;
    height: 80px;
  }
</style>
