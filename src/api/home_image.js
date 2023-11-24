import request from '@/utils/request'

export function page(name,gender,begin,end,page,pageSize) {
  return request({
    url: '/lunbotus?name='+name+'&gender='+gender+'&begin='+begin+'&end='+end+'&page='+page+'&pageSize='+pageSize,
    method: 'get'
  })
}
export function findAll() {
  return request({
    url: '/lunbotus',
    method: 'get'
  })
}
export function add(home_image) {
  return request({
    url: '/lunbotus',
    method: 'post',
    data: home_image
  })
}

export function update(dept) {
  return request({
    url: '/lunbotus',
    method: 'put',
    data: dept
  })
}


export function deleteById(id) {
  return request({
    url: '/lunbotus/'+id,
    method: 'delete',
  })
}


export function selectById(id) {
  return request({
    url: '/lunbotus/'+id,
    method: 'get',
  })
}

