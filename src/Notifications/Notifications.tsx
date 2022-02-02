import React, { useCallback, useEffect, useState, FC, memo } from "react"

import Notification  from "./Notification/Notification"
import './Notifications.css'
import { getNotifications } from "./utils"

import updateIcon from './icons/update.png'

interface INotifications {
  userId: string
}

const Notifications: FC<INotifications> = ({userId}) => {
  const [notifications, setNotifications] = useState<any[]>([])

  const getNotificationsCallback = useCallback(async () => {
    const notifications = await getNotifications(userId)

    console.log(notifications)
    setNotifications(notifications.reverse())
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
      <div className="notifications">
        {notifications.map((notification) => <Notification {...notification} key={notification.tx_hash} />)}
      </div>
    </div>
  )
}

export default memo(Notifications)