
// export const PROTOCOL = 'http'
// export const API_ADDR = '51.158.148.158'
// export const API_PORT = '3000'

// let id = null

// const pushNotification = (id, title, message) => {
//   chrome.notifications.create(`${id}`, {
//     type: 'basic',
//     iconUrl: 'notification.png',
//     title: `${title}`,
//     message: `${message}`,
//     priority: 2
//   })
// }


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // pushNotification(message.id, message.title, message.message)

  chrome.notifications.create(`${message.id}`, {
    type: 'basic',
    iconUrl: 'notification.png',
    title: `${message.title}`,
    message: `${message.message}`,
    priority: 2
  })
  // if (message.title === 'Transaction finished') {
    // pushNotification(message.id, message.title, message.message)
  // }

  // if (message.title === 'connect') {
  //   id = message.id
  //   console.log(id)
  //   pushNotification(message.id, message.title, message.message)

  //   // const ws = new WebSocket(`ws://${API_ADDR}:${API_PORT}/ws/${message.id}`)

  //   // ws.onmessage = (event) => {
  //   //   const data = JSON.parse(JSON.parse(event.data))
  //   //   data && pushNotification(data.tx_hash, 'Transaction finished', `Transaction hash: ${data.tx_hash}`)
  //   // }
  //   // sendResponse({ farewell: `id: ${id}` })

  // }

  sendResponse({ farewell: "goodbye sadada" })

  console.log(message)
})


// if (id) {
//   const ws = new WebSocket(`ws://${API_ADDR}:${API_PORT}/ws/${message.id}`)

//   ws.onmessage = (event) => {
//     const data = JSON.parse(JSON.parse(event.data))
//     data && pushNotification(data.tx_hash, 'Transaction finished', `Transaction hash: ${data.tx_hash}`)
//   }
// }


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   chrome.notifications.create(`${message.id}`, {
//     type: 'basic',
//     iconUrl: 'notification.png',
//     title: `${message.title}`,
//     message: `${message.message}`,
//     priority: 2
//   })
//   sendResponse({ farewell: "goodbye sadada" })

//   console.log(message)
// })



