<template>
  <el-card class="box-card" style="margin: 10px;">

    <div slot="header" class="clearfix">
      <span>编辑用户</span>
    </div>

    <div class="save-container">
      <el-form :model="postForm" class="form-container" label-position="right" label-width="auto" size="mini">
        <el-form-item class="filter-form-item" label="邮箱">
          <el-input v-model="postForm.email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="filter-form-item" label="手机号">
          <el-input v-model="postForm.phone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="filter-form-item" label="账号">
          <el-input v-model="postForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="filter-form-item" label="昵称">
          <el-input v-model="postForm.nickname" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="filter-form-item" label="性别">
          <el-select v-model="postForm.gender" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in gender_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="filter-form-item" label="用户组">
          <el-checkbox-group v-model="postForm.group_set">
            <el-checkbox v-for="group in group_options" :label="group.group_id" :key="group.group_id" >{{group.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getDetail, add, edit } from '@/api/auth/admin'
import { getList } from '@/api/auth/group'
import constant from '@/utils/constant'

const defaultForm = {
  email: '',
  phone: '',
  name: '',
  nickname: '',
  gender: -1,
  group_set: [],
}

export default {
  data() {
    return {
      is_edit: false, // 是否是编辑页面
      postForm: Object.assign({}, defaultForm),

      // 下拉表单内容
      gender_options : constant.gender_options,
      group_options: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.is_edit = this.$route.query.is_edit

      var response = await getList({_all: 1})
      this.group_options = response.data.list

      // 初始化表单数据
      if (this.is_edit) {
        response = await getDetail(this.$route.query.id)
        this.postForm = {
          admin_id: this.$route.query.id,
          email: response.data.email,
          phone: response.data.phone,
          name: response.data.name,
          nickname: response.data.nickname,
          gender: response.data.gender,
          group_set: response.data.group_set,
        }
      }
    },
    async onSubmit() {
      if (this.is_edit) {
        await edit(this.postForm)
      } else {
        await add(this.postForm)
      }
      this.$router.back(-1)
    },
    onCancel() {
      this.$router.back(-1)
    }
  }
}
</script>

<style>
.save-container {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
}
</style>
