import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/auth/rule',
    method: 'get',
    params: data
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
