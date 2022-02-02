import React, { useCallback, useEffect, useMemo, useState, FC } from "react"

import useWebSocket from 'react-use-websocket'

import { sendNotificationMessage } from "../helpers/sendNotificationMessage"
import { API_ADDR, API_PORT } from "./consts"
import { Notification } from "./Notification/Notification"
import './Notifications.css'
import { getNotifications } from "./utils"

import updateIcon from './icons/update.png'

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
      isRead: true,
    },
    {
      id: '2',
      text: 'Hi',
      title: 'Lol',
      isRead: false,
    },
    {
      id: '3',
      text: 'Poka',
      title: 'KEKEK',
      isRead: false,
    },
  ]


  return (
    <div className="NotificationsContainer">
      <div onClick={getNotificationsCallback} className={'update'}>
        <img src={updateIcon} alt={'update'} width={20} height={20} onClick={getNotificationsCallback} style={{cursor: 'pointer'}}/>
      </div>
      <div onClick={() => sendNotificationMessage({ title: 'kek', message: 'lol', id: 'asdasd' })} className="notifications">
        {notifications1.map((notification) => <Notification {...notification} key={notification.id} />)}
      </div>
    </div>
  )
}