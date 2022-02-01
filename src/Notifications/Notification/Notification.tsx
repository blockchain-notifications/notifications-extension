import React, { FC } from 'react'
import './Notification.css'


interface INotification {
  id: string
  text: string
  title: string
}

export const Notification: FC<INotification> = ({ id, text, title }) => {
  return (
    <div className='Notification'>
      <div className='Title'>
        {title}
      </div>

      <div className='Text'>
        {text}
      </div>
    </div>
  )
}