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

export function getCompanyPositionApi(params) {
  const url = '/getPositionById'
  return Http.get(url, {
    params: params
  })
}

export function getPositionInfo(params) {
  const url = '/getPositionInfo'
  return Http.get(url, {
    params: params
  })
}

export function insertPosition(params) {
  const url = '/insertPosition'
  return Http.post(url, params)
}
