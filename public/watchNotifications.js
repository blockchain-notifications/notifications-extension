
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.notifications.create(`${message.id}`, {
    type: 'basic',
    iconUrl: 'notification.png',
    title: `${message.title}`,
    message: `${message.message}`,
    priority: 2
  })
  sendResponse({ farewell: "goodbye sadada" })

  console.log(message)
})

