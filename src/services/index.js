import request from '@/utils/request'

export async function query({id,page}){
  return request(`/comments/show?id=${id}&page=${page}`)
}
