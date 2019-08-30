<template>
  <div class="addRule-container">
    <el-form :model="postForm" class="form-container" :label-position="labelPosition" label-width="80px" size="mini">
      <el-form-item label="父菜单">
        <el-input v-model="postForm.parent_id"></el-input>
      </el-form-item>
      <el-tree
        :data="postForm.parent_id"
        node-key="rule_id"
        :default-checked-keys="[]"
        :props="formOptions.parents">
      </el-tree>
      <el-form-item label="菜单名称">
        <el-input v-model="postForm.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单标题">
        <el-input v-model="postForm.title"></el-input>
      </el-form-item>
      <el-form-item label="菜单描述">
        <el-input v-model="postForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="postForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="postForm.type">
          <el-radio :label=1>菜单</el-radio>
          <el-radio :label=2>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="postForm.is_show"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList } from '@/api/auth/rule'

const defaultForm = {
  parent_id: 0,
  name: '',
  title: '',
  desc: '',
  icon: '',
  type: 1,
  is_show: true
}

export default {
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      formOptions: {
        parents: []
      },
      loading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      var response = await getList(this.listQuery)
      this.formOptions.parents = response.data.list
    },
    onSubmit() {

    }
  }
}
</script>

<style>
.form-container {
  margin: 20px;
}
</style>
