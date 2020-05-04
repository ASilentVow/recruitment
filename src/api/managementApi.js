import Http from '@/libs/axios'

export function delUser(params) {
  const url = '/delUser'
  return Http.post(url, params)
}

export function delJob(params) {
  const url = '/delPosition'
  return Http.post(url, params)
}

export function delCompany(params) {
  const url = '/delCompany'
  return Http.post(url, params)
}

export function editUser(params) {
  const url = '/editUser'
  return Http.post(url, params)
}
