import Http from '@/libs/axios'

export function sendDelivery(params) {
  const url = '/insertDelivery'
  return Http.post(url, params)
}

export function getDelivery(params) {
  const url = '/getDelivery'
  return Http.get(url, {
    params: params
  })
}

export function getReceive(params) {
  const url = '/getReceive'
  return Http.get(url, {
    params: params
  })
}
