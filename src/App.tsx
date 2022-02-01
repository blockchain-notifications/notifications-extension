import { SignBytesResult, useConnectedWallet, UserDenied, useWallet, verifyBytes } from '@terra-money/wallet-provider'
import React, { useCallback } from 'react'
import './App.css'
import { Notifications } from './Notifications/Notifications'

function App() {
  const { status, network, wallets, availableConnectTypes, availableConnections, connect } = useWallet()
  const connectedWallet = useConnectedWallet()

  const connectWallet = useCallback(async () => {
    console.log(availableConnectTypes)
    connect(availableConnectTypes[0])
  }, [connect, availableConnectTypes])

  const callback = useCallback(async () => {
    console.log(status)
    const BYTES = Buffer.from('hello world')
    try {
      const result = await connectedWallet?.signBytes(BYTES)

      console.log(result)

      // const verified: boolean = verifyBytes(BYTES, result)
    } catch (error) {
      if (error instanceof UserDenied) {
        console.log(error, 'denied')
      } else {
        console.log(error)
      }
    }
  }, [connectedWallet, status])

  // callback()

  console.log(chrome.management.getAll((l) => console.log(l)))

  return (
    <div className="App">
      {availableConnections.map(
        ({ type, name, icon, identifier = '' }) => (
          <button
            key={'connection-' + type + identifier}
            onClick={() => connect(type, identifier)}
          >
            <img
              src={icon}
              alt={name}
              style={{ width: '1em', height: '1em' }}
            />
            {name} [{identifier}]
          </button>
        ),
      )}
      <div onClick={() => callback()}>
        sign
      </div>
      <Notifications />

    </div>
  )
}

export default App
