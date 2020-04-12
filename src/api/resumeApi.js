import Http from '@/libs/axios'

export function saveOrUpdateResume(params) {
  const url = '/saveResume'
  return Http.post(url, params)
}

export function getResume(params) {
  const url = '/getResume'
  return Http.get(url, {
    params: params
  })
}
