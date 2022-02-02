import React, { useCallback, useEffect, FC, useState } from 'react'
import './Wallet.css'

interface IWallet {
  setUserId: React.Dispatch<React.SetStateAction<string>>
  userId: string
}

export const Wallet: FC<IWallet> = ({ userId, setUserId }) => {
  const [value, setValue] = useState(userId)

  useEffect(() => {
    setValue(userId)
  }, [userId])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [setValue])

  const handleSubmit = useCallback(() => {
    chrome.storage.local.set({ "wallet": value })
    setUserId(value)
  }, [value, setUserId])

  return (
    <div className='Wallet'>
      <div className='inputContainer'>
        <label>
          Enter your wallet address
          <input type="text" value={value} onChange={handleChange} className={'input'} />
        </label>
      </div>

      <div className={'btnContainer'}>
        <div onClick={handleSubmit} className='btn'>Save</div>
      </div>
    </div>
  )
}