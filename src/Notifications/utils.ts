import { API_ADDR, API_PORT, PROTOCOL } from "./consts"

export const getNotifications = async (clientId: string, isRead: boolean) => {
  const response = await fetch(
    `${PROTOCOL}://${API_ADDR}:${API_PORT}/notifications?client_id=${clientId}&is_read=${isRead}`,
    {
      mode: 'no-cors', method: 'GET', headers: {
        'Content-Type': 'application/json'
      },
    });

  return response.json()
}