<template>
  <div>
    <el-main>
      <el-button size="mini" @click="handleAdd()">新增</el-button>
      <el-table :data="tableData">
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="age" label="年龄" width="100"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <input type="button" value="首页" @click="firstPage" />
    <input type="button" value="上一页" @click="prevPage" />
    <span
      :class="{'blue':isActive}"
      v-for="index in totalPage"
      :key="index"
      @click="getPageNUmVal(index)"
      >{{ index + " " }}</span
    >
    <input type="button" value="下一页" @click="nextPage" />
    <input type="button" value="尾页" @click="lastPage" />
    <TestDialog ref="TestDialog"></TestDialog>
  </div>
</template>
    
<script>
import axios from "axios";
import { url } from "../assets/store.js";
import TestDialog from "@/components/TestDialog.vue"; //导入弹窗组件
export default {
  components: {
    TestDialog, //注册弹窗组件
  },

  data() {
    return {
      tableData: [],
      totalNum: 1, //总条数
      totalPage: 1, //总页数
      pageNum: 1, // 页数，默认为1
      pageSize: 5, // 每页显示数量
      row: null,
      isActive:false,
    };
  },

  methods: {
    GetUserInfo() {
      axios
        .get(url + "/testproject/test/list", {
          // 传递的参数
          params: {
            // 页码
            pageNum: this.pageNum,
            // 条数
            pageSize: this.pageSize,
          },
          // 回调函数,一定要使用箭头函数,不然this的指向不是vue示例
        })
        .then((res) => {
          let data = res.data.list;
          this.totalNum = res.data.total;
          this.totalPage = Math.ceil(this.totalNum / this.pageSize);
          console.log(data);
          this.tableData = [];
          data.forEach((d) => {
            this.tableData.push({
              id: d.id,
              name: d.name,
              age: d.age,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleAdd() {
      this.$refs.TestDialog.dialogFormVisible = true; //用于改变弹窗子组件是否显示的属性
    },
    handleEdit(row) {
      console.log(row.name);
      this.$refs.TestDialog.dialogFormVisible = true; //用于改变弹窗子组件是否显示的属性
      this.$refs.TestDialog.telForm.name = row.name;
      this.$refs.TestDialog.telForm.age = row.age;
      this.$refs.TestDialog.telForm.id = row.id;
    },

    handleDel(row) {
      console.log(row.id);
      axios
        .get(url + "/testproject/test/delete", {
          // 传递的参数
          params: {
            id: row.id,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$message.success(res.data);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //上一页
    prevPage() {
      this.pageNum--;
      this.GetUserInfo();
    },
    // 下一页
    nextPage() {
      if (this.pageNum >= this.totalPage) {
        this.$message.info("已经是最后一页了");
        return;
      }
      this.pageNum++;
      this.GetUserInfo();
    },
    //尾页
    lastPage() {
      this.pageNum = this.totalPage == 0 ? 1 : this.totalPage;
      this.GetUserInfo();
    },
    //首页
    firstPage() {
      this.pageNum = 1;
      this.GetUserInfo();
    },
    //点击页码
    getPageNUmVal(index) {
      this.isActive=true;
      this.pageNum = index;
      this.GetUserInfo();
    },
  },

  mounted() {
    this.GetUserInfo();
  },
};
</script>
    
<style>
.blue {
  color: blue;
}
</style>
    