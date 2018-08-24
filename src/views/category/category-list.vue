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
      <el-table-column label="类别" prop="title">
      </el-table-column>
      <el-table-column label="分类排序" prop="index">
      </el-table-column>
      <el-table-column label="操作">
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
        handleDelete(id){}
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
