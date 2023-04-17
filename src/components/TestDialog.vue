<template>
  <div>
    <!-- Form -->
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="telForm" :rules="rules">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="telForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="telForm.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
        <el-button @click="addsubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import axios from "axios";
import { url } from "../assets/store.js";
export default {
  data() {
    return {
      dialogFormVisible: false, //这里是控制弹窗是否显示的，可以看下哪里引用到了
      telForm: {
        id: "",
        name: "",
        age: "",
      },
      formLabelWidth: "120px",
      rules: {
      name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      age: [{ required: true, message: "年龄不能为空", trigger: "blur" }]
    }
    };
    
  },
  methods: {
    addsubmit() {
      console.log(
        "姓名" +
          this.telForm.name +
          "年龄" +
          this.telForm.age +
          "--------------telForm"
      );
      if(this.telForm.name == ''){
        this.$message.success('姓名不能为空');
        return;
      }
      if(this.telForm.age == ''){
        this.$message.success('年龄不能为空');
        return;
      }
      axios({
        method: "post",
        url: url + "/testproject/test/save",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        changeOrigin: true,
        data: this.telForm,
      }).then((res) => {
        console.log(res.data);
        this.$message.success(res.data);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
      this.dialogFormVisible = false;
    },
  },
};
</script>
  