<template>
  <el-card class="box-card" style="margin: 10px;">
  
    <!-- 搜索表单 -->
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item class="filter-form-item">
          <el-input v-model="listQuery.name" size="mini" placeholder="请输入">
            <template slot="prepend">名称</template>
          </el-input>
        </el-form-item>
        <el-form-item class="filter-form-item">
          <el-button size="mini" type="primary" @click="getList">查询</el-button>
          <el-button size="mini" type="normal" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 功能栏 -->
    <div class="action-container">
      <el-button type="info" size="mini" icon="el-icon-refresh" @click="getList" />
      <router-link :to="'/auth/group/save'">
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
    <el-table v-loading="listLoading" :data="list" row-key="group_id" size="mini" fit highlight-current-row style="width: 100%" ref="table">
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column align="center" label="id" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.group_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="220">
        <template slot-scope="scope">
          <router-link :to="'/auth/group/save?is_edit=1&id='+scope.row.group_id">
            <el-button type="primary" size="mini" icon="el-icon-edit" />
          </router-link>
          <router-link :to="'/auth/group/rules?id='+scope.row.group_id">
            <el-button type="primary" size="mini" >权限</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDel(scope.row.group_id)"/>
        </template>
      </el-table-column>
    </el-table>
  
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </el-card>
</template>

<script>
import { getList, del, multiDel } from '@/api/auth/group'
import Pagination from '@/components/Pagination'

var defaultListQuery = {
  page: 1,
  limit: 20,
  name: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
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
      this.total = response.data.total
      this.listLoading = false
    },
    reset() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    async onDel(id) {
      await del(id)
      await this.getList()
    },
    async onMultiDelete() {
      var group_ids = this.$refs.table.selection.map(o => o.group_id)
      await multiDel(group_ids)
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
