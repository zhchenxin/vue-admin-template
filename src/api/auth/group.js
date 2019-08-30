import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/auth/group',
    method: 'get',
    params: data
  })
}

export function getDetail(group_id) {
  return request({
    url: '/auth/group/detail',
    method: 'get',
    params: {group_id: group_id}
  })
}

export function add(data) {
  return request({
    url: '/auth/group/add',
    method: 'post',
    params: data
  })
}

export function edit(data) {
  return request({
    url: '/auth/group/edit',
    method: 'post',
    params: data
  })
}

export function del(group_id) {
  return request({
    url: 'auth/group/delete',
    method: 'post',
    params: { 'group_id': group_id }
  })
}

// 批量删除
export function multiDel(group_ids) {
  return request({
    url: 'auth/group/delete/multi',
    method: 'post',
    params: { 'group_id': group_ids.join(',') }
  })
}

