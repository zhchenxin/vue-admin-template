<template>
  <el-card class="box-card" style="margin: 10px;">
  
    <!-- 搜索表单 -->
    <div class="filter-container">
      <el-form inline :model="listQuery" size="mini">
        <el-form-item class="filter-form-item" label="邮箱">
          <el-input v-model="listQuery.email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="filter-form-item" label="手机号">
          <el-input v-model="listQuery.phone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="filter-form-item" label="账号">
          <el-input v-model="listQuery.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="filter-form-item" label="昵称">
          <el-input v-model="listQuery.nickname" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="filter-form-item" label="性别">
          <el-select clearable v-model="listQuery.gender" placeholder="请选择">
            <el-option v-for="item in gender_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="filter-form-item" label="性别">
          <el-select clearable v-model="listQuery.gender" placeholder="请选择">
            <el-option v-for="item in gender_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="filter-form-item" label="性别">
          <el-select clearable v-model="listQuery.gender" placeholder="请选择">
            <el-option v-for="item in gender_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="filter-form-item" label="性别">
          <el-select clearable v-model="listQuery.gender" placeholder="请选择">
            <el-option v-for="item in gender_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="filter-form-item" label="性别">
          <el-select clearable v-model="listQuery.gender" placeholder="请选择">
            <el-option v-for="item in gender_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
      <router-link :to="'/auth/admin/save'">
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
    <el-table v-loading="listLoading" :data="list" row-key="admin_id" size="mini" fit highlight-current-row style="width: 100%" ref="table">
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column align="center" label="id" width="50">
        <template slot-scope="scope"><span>{{ scope.row.admin_id }}</span></template>
      </el-table-column>

      <el-table-column align="center" label="邮箱" width="150">
        <template slot-scope="scope"><span>{{ scope.row.email }}</span></template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="150">
        <template slot-scope="scope"><span>{{ scope.row.phone }}</span></template>
      </el-table-column>

      <el-table-column align="center" label="账号" width="80">
        <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
      </el-table-column>

      <el-table-column align="center" label="昵称" width="80">
        <template slot-scope="scope"><span>{{ scope.row.nickname }}</span></template>
      </el-table-column>

      <el-table-column align="center" label="头像" width="80">
        <template slot-scope="scope"><span>{{ scope.row.avatar }}</span></template>
      </el-table-column>

      <el-table-column align="center" label="性别" width="80">
        <template slot-scope="scope"><span>{{ scope.row.gender }}</span></template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="220">
        <template slot-scope="scope">
          <router-link :to="'/auth/admin/save?is_edit=1&id='+scope.row.admin_id">
            <el-button type="primary" size="mini" icon="el-icon-edit" />
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDel(scope.row.admin_id)"/>
        </template>
      </el-table-column>
    </el-table>
  
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </el-card>
</template>

<script>
import { getList, del, multiDel } from '@/api/auth/admin'
import Pagination from '@/components/Pagination'
import constant from '@/utils/constant'

var defaultListQuery = {
  page: 1,
  limit: 20,
  email: '',
  phone: '',
  name: '',
  nickname: '',
  gender: '',
}

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      gender_options : constant.gender_options
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
      var group_ids = this.$refs.table.selection.map(o => o.admin_id)
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
/*.filter-form-item {*/
  /*width: 300px;*/
/*}*/
</style>
