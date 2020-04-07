import Http from '@/libs/axios'

export function getCompanyListApi(params) {
  const url = '/companyPage'
  return Http.get(url, {
    params: params
  })
}

export function getAllCompanyListApi(params) {
  const url = '/allCompanyPage'
  return Http.get(url, {
    params: params
  })
}
