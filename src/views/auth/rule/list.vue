<template>
  <div class="app-container">

    <!-- 搜索表单 -->
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item class="filter-form-item">
          <el-input v-model="listQuery.title" size="mini" placeholder="请输入" >
            <template slot="prepend">标题</template>
          </el-input>
        </el-form-item>
        <el-form-item class="filter-form-item">
          <el-button size="mini" type="primary" @click="getList">查询</el-button>
          <el-button size="mini" type="normal" @click="reset">重置</el-button>
          <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="action-container">
      <el-button type="info" size="mini" icon="el-icon-refresh" @click="getList"></el-button>
      <router-link :to="'/auth/rule/add'">
        <el-button type="primary" size="mini" icon="el-icon-plus">新建</el-button>
      </router-link>
    </div>

    <!-- 列表页 -->
    <el-table v-loading="listLoading" :data="list" row-key="rule_id" size="mini" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.rule_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="type">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="title">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="icon">
        <template slot-scope="scope">
          <span>{{ scope.row.icon }}</span>
        </template>
      </el-table-column>

      <el-table-column width="60px" align="center" label="weigh">
        <template slot-scope="scope">
          <span>{{ scope.row.weigh }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-arrow-up" @click="moveUp(scope.row.rule_id)" />
          <el-button type="primary" size="mini" icon="el-icon-arrow-down" @click="moveDown(scope.row.rule_id)" />
          <router-link :to="'/auth/rule/edit?id='+scope.row.rule_id">
            <el-button type="primary" size="mini" icon="el-icon-edit" />
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getList, moveUp, moveDown } from '@/api/auth/rule'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
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
      this.listQuery = {
        page: 1,
        limit: 20
      }
    },
    async moveUp(id) {
      await moveUp(id)
      await getList()
    },
    async moveDown(id) {
      await moveDown(id)
      await getList()
    },
    handleExport() {

    }
  }
}
</script>

<style scoped>
.filter-container {
  margin-bottom: 10px;
}
.action-container {
  margin-bottom: 10px;
}
.filter-form-item {
  width: 250px;
}
</style>
