<template>
  <el-card class="box-card" style="margin: 10px;">

    <div class="action-container">
      <el-button type="info" size="mini" icon="el-icon-refresh" @click="getList" />
      <router-link :to="'/auth/rule/save'">
        <el-button type="primary" size="mini" icon="el-icon-plus">新建</el-button>
      </router-link>
      <el-dropdown size="mini" placement="bottom">
        <el-button size="mini" type="normal">更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 100px;">
          <el-dropdown-item><el-button style="color: #999;border: 0;width: 100%;" size="mini" @click="onMultiDelete">删除</el-button></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 列表页 -->
    <el-table v-loading="listLoading" :data="list" row-key="rule_id" size="mini" fit highlight-current-row style="width: 100%" ref="table">
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column align="center" label="id" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.rule_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="图标">
        <template slot-scope="scope">
          <span>{{ scope.row.icon }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.is_show ? '正常' : '隐藏' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="220">
        <template slot-scope="scope">
          <el-button type="normal" size="mini" icon="el-icon-arrow-up" @click="onMoveUp(scope.row.rule_id)" />
          <el-button type="normal" size="mini" icon="el-icon-arrow-down" @click="onMoveDown(scope.row.rule_id)" />
          <router-link :to="'/auth/rule/save?is_edit=1&id='+scope.row.rule_id">
            <el-button type="primary" size="mini" icon="el-icon-edit" />
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDel(scope.row.rule_id)"/>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
import { getList, moveUp, moveDown, del, multiDel } from '@/api/auth/rule'

export default {
  filters: {
    typeFilter(type) {
      const typeMap = {
        1: '菜单',
        2: '按钮'
      }
      return typeMap[type]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      var response = await getList(this.listQuery)
      this.list = response.data.list
      this.listLoading = false
    },
    reset() {
      this.listQuery = {
        page: 1,
        limit: 20
      }
    },
    async onMoveUp(id) {
      await moveUp(id)
      await this.getList()
    },
    async onMoveDown(id) {
      await moveDown(id)
      await this.getList()
    },
    async onDel(id) {
      await del(id)
      await this.getList()
    },
    async onMultiDelete() {
      var rule_ids = this.$refs.table.selection.map(o => o.rule_id)
      await multiDel(rule_ids)
      await this.getList()
    }
  }
}
</script>

<style scoped>
.action-container {
  margin-bottom: 10px;
}
</style>
