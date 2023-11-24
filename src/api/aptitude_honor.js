import request from '@/utils/request'

export function page(name,gender,begin,end,page,pageSize) {
  return request({
    url: '/honor?name='+name+'&gender='+gender+'&begin='+begin+'&end='+end+'&page='+page+'&pageSize='+pageSize,
    method: 'get'
  })
}
export function findAll() {
  return request({
    url: '/honor',
    method: 'get'
  })
}
export function add(aptitude_honor) {
  return request({
    url: '/honor',
    method: 'post',
    data: aptitude_honor
  })
}

export function update(dept) {
  return request({
    url: '/honor',
    method: 'put',
    data: dept
  })
}


export function deleteById(id) {
  return request({
    url: '/honor/'+id,
    method: 'delete',
  })
}


export function selectById(id) {
  return request({
    url: '/honor/'+id,
    method: 'get',
  })
}

