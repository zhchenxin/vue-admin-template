<template>
  <el-card class="box-card" style="margin: 10px;">

    <div slot="header" class="clearfix">
      <span>编辑用户组</span>
    </div>

    <div class="save-rule-container">
      <el-form :model="postForm" class="form-container" label-position="right" label-width="80px" size="mini">
        <el-form-item label="名称">
          <el-input v-model="postForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="postForm.desc" />
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
import { getDetail, add, edit } from '@/api/auth/group'

const defaultForm = {
  parent_id: 0,
  name: '',
  desc: '',
}

export default {
  data() {
    return {
      is_edit: false, // 是否是编辑页面
      postForm: Object.assign({}, defaultForm)
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.is_edit = this.$route.query.is_edit

      // 初始化表单数据
      if (this.is_edit) {
        var response = await getDetail(this.$route.query.id)
        this.postForm = {
          group_id: this.$route.query.id,
          parent_id: response.data.parent_id,
          name: response.data.name,
          desc: response.data.desc
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
