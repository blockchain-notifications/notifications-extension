import React, { FC, memo } from 'react'
import './Notification.css'


interface INotification {
  tx_hash: string
  is_read: boolean
  data: string
  event: string
  sender: string
}

const Notification: FC<INotification> = ({ event, tx_hash, is_read, data, sender }) => {
  return (
    <div className={is_read ? 'NotificationRead' : 'Notification'}>
      <div className='Title'>
        {event}
      </div>

      <div className='Text'>
        Sender: {sender}
      </div>
      <div className='Text'>
        Hash: {tx_hash}
      </div>
      <div className='Text'>
        Data: {data}
      </div>
    </div>
  )
}

export default memo(Notification)