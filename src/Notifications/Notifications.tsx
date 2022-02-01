import React from "react"
import { Notification } from "./Notification/Notification"
import './Notifications.css'

export const Notifications = () => {
  const notifications = [
    {
      id: 1,
      text: 'Privet',
      title: 'Kek',
    },
    {
      id: 2,
      text: 'Hi',
      title: 'Lol',
    },
    {
      id: 3,
      text: 'Poka',
      title: 'KEKEK',
    },
  ]

  return (
    <div className="NotificationsContainer">
      {notifications.map((notification) => <Notification {...notification} key={notification.id}/>)}
    </div>
  )
}