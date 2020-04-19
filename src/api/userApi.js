import Http from '@/libs/axios'

export function registryUser(params) {
  const url = '/registry'
  return Http.post(url, params)
}

export function loginUser(params) {
  const url = '/login'
  return Http.post(url, params)
}

export function updateUserCompany(params) {
  const url = '/updateCompany'
  return Http.post(url, params)
}
