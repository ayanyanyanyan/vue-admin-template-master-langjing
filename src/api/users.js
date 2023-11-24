import request from '@/utils/request'

export function page(name,gender,begin,end,page,pageSize) {
  return request({
    url: '/users?name='+name+'&gender='+gender+'&begin='+begin+'&end='+end+'&page='+page+'&pageSize='+pageSize,
    method: 'get'
  })
}

export function add(users) {
  return request({
    url: '/users',
    method: 'post',
    data: users
  })
}

export function update(dept) {
  return request({
    url: '/users',
    method: 'put',
    data: dept
  })
}


export function deleteById(id) {
  return request({
    url: '/users/'+id,
    method: 'delete',
  })
}


export function selectById(id) {
  return request({
    url: '/users/'+id,
    method: 'get',
  })
}

