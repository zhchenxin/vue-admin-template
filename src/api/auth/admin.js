import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/auth/admin',
    method: 'get',
    params: data
  })
}

export function getDetail(admin_id) {
  return request({
    url: '/auth/admin/detail',
    method: 'get',
    params: {admin_id: admin_id}
  })
}

export function add(data) {
  return request({
    url: '/auth/admin/add',
    method: 'post',
    params: data
  })
}

export function edit(data) {
  return request({
    url: '/auth/admin/edit',
    method: 'post',
    params: data
  })
}

export function del(admin_id) {
  return request({
    url: 'auth/admin/delete',
    method: 'post',
    params: {admin_id: admin_id}
  })
}

// 批量删除
export function multiDel(admin_ids) {
  return request({
    url: 'auth/rule/delete/multi',
    method: 'post',
    params: { 'admin_id': admin_ids.join(',') }
  })
}

