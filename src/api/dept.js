import request from '@/utils/request'
import { upload } from './upload'

export function page(name,gender,begin,end,page,pageSize) {
  return request({
    url: '/depts?name='+name+'&gender='+gender+'&begin='+begin+'&end='+end+'&page='+page+'&pageSize='+pageSize,
    method: 'get'
  })
}

export function findAll() {
  return request({
    url: '/depts',
    method: 'get'
  })
}

export function add(dept) {
  return request({
    url: '/depts',
    method: 'post',
    data: dept
  })
}

// 上传图片
export const fileUploadImage = data => request({
	url: api/upload/chanpin, // path路径
	method: 'post', // 请求方法
	headers: { // 请求头
		'Content-Type': 'multipart/form-data' // 上传文件所要求的格式formdata
	},
	data:dept           // 请求体
})

export function update(dept) {
  return request({
    url: '/depts',
    method: 'put',
    data: dept
  })
}

export function deleteById(id) {
  return request({
    url: '/depts/' + id,
    method: 'delete'
  })
}

export function selectById(id) {
  return request({
    url: '/depts/' + id,
    method: 'get'
  })
}
