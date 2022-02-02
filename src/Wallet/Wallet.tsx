import React, { useCallback, useEffect, useState } from 'react'
import './Wallet.css'


export const Wallet = () => {
  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  const handleSubmit = useCallback(() => {
    chrome.storage.local.set({ "wallet": value });
  }, [value])

  useEffect(() => {
    chrome.storage.local.get(["wallet"], (res) => {
      setValue(res.wallet)
    })
  }, [])

  return (
    <div className='Wallet'>
        <label>
          Enter your wallet address
          <input type="text" value={value} onChange={handleChange} className={'input'}/>
        </label>

        <div onClick={handleSubmit} className='btn'>Save</div>
    </div>
  )
}