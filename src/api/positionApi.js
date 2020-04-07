import Http from '@/libs/axios'

export function getPositionListApi(params) {
  const url = '/positionPage'
  return Http.get(url, {
    params: params
  })
}

export function getAllPositionListApi(params) {
  const url = '/allPositionPage'
  return Http.get(url, {
    params: params
  })
}
