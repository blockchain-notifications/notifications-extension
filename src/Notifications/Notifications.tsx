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
      const data = JSON.parse(JSON.parse(lastMessage.data)) as any
      setNotifications(prev => [data].concat(prev))
      sendNotificationMessage({
        title: `${data.event}`,
        message: `Transaction hash: ${data.tx_hash}`,
        id: data.tx_hash || 'NO_ID'
      })
    }
    console.log(lastMessage, 'message')
  }, [lastMessage])


  const getNotificationsCallback = useCallback(async () => {
    const notReadNotifs = await getNotifications(userId, false)
    const readNotifs = await getNotifications(userId, true)

    console.log(readNotifs, notReadNotifs)
    setNotifications(notReadNotifs)
    setNotifications((prev) => prev.concat(readNotifs.reverse()))
  }, [userId])

  const readAllCallback = useCallback(async () => {
    const notReadNotifs = notifications.filter((n) => !n.is_read)
  }, [notifications])

  useEffect(() => {
    getNotificationsCallback()
  }, [getNotificationsCallback])

  useEffect(() => {
    console.log(notifications)
  }, [notifications])


  return (
    <div className="NotificationsContainer">
      <div onClick={getNotificationsCallback} className={'header'}>
        <div className={'read'} onClick={readAllCallback}>Read all</div>
        <img src={updateIcon} alt={'update'} width={20} height={20} onClick={getNotificationsCallback} style={{cursor: 'pointer'}}/>
      </div>
      <div onClick={() => sendNotificationMessage({ title: 'kek', message: 'lol', id: 'asdasd' })} className="notifications">
        {notifications.map((notification) => <Notification {...notification} key={notification.tx_hash} />)}
      </div>
    </div>
  )
}