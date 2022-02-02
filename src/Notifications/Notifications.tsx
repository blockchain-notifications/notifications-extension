import React, { useCallback, useEffect, useMemo, useState } from "react"

import useWebSocket, { ReadyState } from 'react-use-websocket'


import { sendNotificationMessage } from "../helpers/sendNotificationMessage"
import { Notification } from "./Notification/Notification"
import './Notifications.css'
import { getNotifications } from "./utils"

export const Notifications = () => {
  const PROTOCOL = 'http'
  const API_ADDR = 'localhost'
  const API_PORT = '80'
  const socketUrl = `ws://${API_ADDR}:${API_PORT}/ws/`
  const [userId, setUserId] = useState('')

  const socketAddr = useMemo(() => socketUrl + userId, [userId])

  const updateId = () => {
    chrome.storage.local.get(["wallet"], (res) => {
      console.log(res)
      setUserId(res.wallet)
    })
  }

  const [notifications, setNotifications] = useState<any[]>([])

  const { lastMessage } = useWebSocket(socketAddr)

  useEffect(() => {
    if (lastMessage !== null) {
      setNotifications(prev => prev.concat(lastMessage))
    }
    console.log(lastMessage, 'message')
  }, [lastMessage])

  useEffect(() => {
    updateId()
  }, [])

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