import { API_ADDR, API_PORT, PROTOCOL } from "./consts"

export const getNotifications = async (clientId: string) => {
  const response = await fetch(
    `${PROTOCOL}://${API_ADDR}:${API_PORT}/notifications?client_id=${clientId}`,
    {
      method: 'GET', headers: {
        'Content-Type': 'application/json'
      },
    })

  return response.json()
}

export const readNotifications = async (txHash: string) => {
  
}