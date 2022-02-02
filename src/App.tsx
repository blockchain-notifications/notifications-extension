import React, { useEffect, useState } from 'react'
import './App.css'
import { sendBackgroundMessage } from './helpers/sendBackgroundMessage'
import Notifications from './Notifications/Notifications'
import Wallet from './Wallet/Wallet'

function App() {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    chrome.storage.local.get(["wallet"], (res) => {
      setUserId(res.wallet)
    })
  }, [setUserId])

  useEffect(() => {
    sendBackgroundMessage({type: 'reconnect'})
  })

  return (
    <div className="App">
      <Wallet setUserId={setUserId} userId={userId}/>
      {userId !== '' && <Notifications userId={userId}/>}
    </div>
  )
}

export default App
