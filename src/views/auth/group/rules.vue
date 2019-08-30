<template>

  <el-card class="box-card" style="margin: 10px;">
  
    <div slot="header" class="clearfix">
      <span>设置用户组的权限</span>
      <div style="float: right; padding: 3px 0">
        <el-button type="primary" size="mini" @click="onSubmit">保存</el-button>
        <el-button size="mini" @click="onCancel">取消</el-button>
      </div>
    </div>
    
    <div class="save-group-rule-container">
      <el-tree
        :data="ruleTree"
        default-expand-all
        show-checkbox
        node-key="id" ref="tree">
      </el-tree>
    </div>
  </el-card>
</template>

<script>
import { getDetail, edit } from '@/api/auth/group'
import { getTree} from '@/api/auth/rule'

export default {
  data() {
    return {
      ruleTree: [],
      rule_set:[],
      group_id: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {

      // 初始化权限树
      var response = await getTree()
      this.ruleTree = response.data

      // 初始化表单数据
      response = await getDetail(this.$route.query.id)
      this.group_id = this.$route.query.id
      this.rule_set = response.data.rule_set
    },
    async onSubmit() {
      let postForm = {group_id: this.group_id, rule_set: this.$refs.tree.getCheckedKeys().join(',')}
      await edit(postForm)
      this.$router.back(-1)
    },
    onCancel() {
      this.$router.back(-1)
    }
  }
}
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
