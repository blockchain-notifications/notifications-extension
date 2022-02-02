import React, { FC } from 'react'
import './Notification.css'


interface INotification {
  id: string
  text: string
  title: string
  isRead: boolean
}

export const Notification: FC<INotification> = ({ id, text, title, isRead }) => {


  return (
    <div className={isRead ? 'NotificationRead' : 'Notification'}>
      <div className='Title'>
        {title}
      </div>

      <div className='Text'>
        {text}
      </div>
    </div>
  )
}