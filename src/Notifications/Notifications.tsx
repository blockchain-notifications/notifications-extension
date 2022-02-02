import React, { useCallback, useEffect, useMemo, useState, FC } from "react"

import useWebSocket from 'react-use-websocket'


import { sendNotificationMessage } from "../helpers/sendNotificationMessage"
import { API_ADDR, API_PORT } from "./consts"
import { Notification } from "./Notification/Notification"
import './Notifications.css'
import { getNotifications } from "./utils"

interface INotifications {
  userId: string
}

export const Notifications: FC<INotifications> = ({userId}) => {
  const socketUrl = `ws://${API_ADDR}:${API_PORT}/ws/`

  const socketAddr = useMemo(() => socketUrl + userId, [userId, socketUrl])

  const [notifications, setNotifications] = useState<any[]>([])

  const { lastMessage } = useWebSocket(socketAddr)

  useEffect(() => {
    if (lastMessage !== null) {
      setNotifications(prev => prev.concat(lastMessage))
    }
    console.log(lastMessage, 'message')
  }, [lastMessage])


  const getNotificationsCallback = useCallback(async () => {
    console.log('here')
    const notifs = await getNotifications(userId, true)
    console.log(notifs)
    setNotifications(notifs)
  }, [userId])

  useEffect(() => {
    getNotificationsCallback()
  }, [getNotificationsCallback])

  useEffect(() => {
    console.log(notifications)
  }, [notifications])

  const notifications1 = [
    {
      id: '1',
      text: 'Privet',
      title: 'Kek',
    },
    {
      id: '2',
      text: 'Hi',
      title: 'Lol',
    },
    {
      id: '3',
      text: 'Poka',
      title: 'KEKEK',
    },
  ]


  return (
    <div className="NotificationsContainer">
      <div onClick={getNotificationsCallback} className={'update'}>
        Update
      </div>
      <div onClick={() => sendNotificationMessage({ title: 'kek', message: 'lol', id: 'asdasd' })} className="notifications">
        {notifications1.map((notification) => <Notification {...notification} key={notification.id} />)}
      </div>
    </div>
  )
}