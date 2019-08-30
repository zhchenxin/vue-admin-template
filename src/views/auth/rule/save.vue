<template>
  <el-card class="box-card" style="margin: 10px;">

    <div slot="header" class="clearfix">
      <span>编辑权限</span>
    </div>

    <div class="save-rule-container">
      <el-form :model="postForm" class="form-container" label-position="right" label-width="80px" size="mini">
        <el-form-item label="父菜单">
          <treeselect v-model="postForm.parent_id" placeholder="空" name="demo" clearable :options="formOptions.parents" />
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="postForm.name" />
        </el-form-item>
        <el-form-item label="菜单标题">
          <el-input v-model="postForm.title" />
        </el-form-item>
        <el-form-item label="菜单描述">
          <el-input v-model="postForm.desc" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="postForm.icon" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="postForm.type">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="postForm.is_show" />
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
import { getTree, getDetail, add, edit } from '@/api/auth/rule'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

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
  components: { Treeselect },
  data() {
    return {
      is_edit: false, // 是否是编辑页面
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
      this.is_edit = this.$route.query.is_edit

      // 初始化表单的下拉选项
      var response = await getTree(this.listQuery)
      this.formOptions.parents = [{id:0, label: "无"}].concat(response.data)

      // 初始化表单数据
      if (this.is_edit) {
        response = await getDetail(this.$route.query.id)
        this.postForm = {
          rule_id: this.$route.query.id,
          parent_id: response.data.parent_id,
          name: response.data.name,
          title: response.data.title,
          desc: response.data.desc,
          icon: response.data.icon,
          type: response.data.type,
          is_show: response.data.is_show
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
.save-rule-container {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
}
</style>
