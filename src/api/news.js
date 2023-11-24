import request from '@/utils/request'
import { upload } from './upload'

export function page(name,gender,begin,end,page,pageSize) {
  return request({
    url: '/news?name='+name+'&gender='+gender+'&begin='+begin+'&end='+end+'&page='+page+'&pageSize='+pageSize,
    method: 'get'
  })
}
export function findAll() {
  return request({
    url: '/news',
    method: 'get'
  })
}

export function add(news) {
  return request({
    url: '/news',
    method: 'post',
    data: news
  })
}
/* export const fileUploadImage = data => request({
	url: api/upload/news, // path路径
	method: 'post', // 请求方法
	headers: { // 请求头
		'Content-Type': 'multipart/form-data' // 上传文件所要求的格式formdata
	},
	data:users           // 请求体
}) */
export function update(dept) {
  return request({
    url: '/news',
    method: 'put',
    data: dept
  })
}

export function deleteById(id) {
  return request({
    url: '/news/' + id,
    method: 'delete'
  })
}

export function selectById(id) {
  return request({
    url: '/news/' + id,
    method: 'get'
  })
}
