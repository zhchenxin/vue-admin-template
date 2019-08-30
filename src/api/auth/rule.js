import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/auth/rule',
    method: 'get',
    params: data
  })
}

export function getTree() {
  return request({
    url: '/auth/rule/tree',
    method: 'get'
  })
}

export function getDetail(rule_id) {
  return request({
    url: '/auth/rule/detail',
    method: 'get'
  })
}

export function moveUp(rule_id) {
  return request({
    url: 'auth/rule/move_up',
    method: 'post',
    params: { 'rule_id': rule_id }
  })
}

export function moveDown(rule_id) {
  return request({
    url: 'auth/rule/move_down',
    method: 'post',
    params: { 'rule_id': rule_id }
  })
}

export function add(data) {
  return request({
    url: '/auth/rule/add',
    method: 'post',
    params: data
  })
}

export function edit(data) {
  return request({
    url: '/auth/rule/edit',
    method: 'post',
    params: data
  })
}

export function del(rule_id) {
  return request({
    url: 'auth/rule/delete',
    method: 'post',
    params: { 'rule_id': rule_id }
  })
}

// 批量删除
export function multiDel(rule_ids) {
  return request({
    url: 'auth/rule/delete/multi',
    method: 'post',
    params: { 'rule_id': rule_ids.join(',') }
  })
}

