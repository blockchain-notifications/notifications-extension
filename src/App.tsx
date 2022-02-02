import React from 'react'
import './App.css'
import { Notifications } from './Notifications/Notifications'
import { Wallet } from './Wallet/Wallet'

function App() {
  return (
    <div className="App">
      <Wallet />
      <Notifications />
    </div>
  )
}

export default App
