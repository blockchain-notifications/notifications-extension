var ws;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'reconnect') {
    if (ws) {
      ws.close()
    }
    ws = undefined
    connect()
  }
  if (message.type === 'updateId') {
    connect()
  }
})

function connect() {
  chrome.storage.local.get(["wallet"], (res) => {
    if (ws) return

    ws = new WebSocket('ws://51.158.148.158:3000/ws/' + res.wallet)

    ws.onopen = function () {
      console.log('connected')
    }

    ws.onclose = function () {
      console.log('disconnected')
      ws = undefined
      connect()
    }

    ws.onmessage = (m) => {
      const data = JSON.parse(JSON.parse(m.data))
      console.log(data)

      chrome.notifications.create(`${data.tx_hash}`, {
        type: 'basic',
        iconUrl: 'notification.png',
        title: `${data.event}`,
        message: `Hash: ${data.tx_hash}`,
        priority: 2
      })
    }
  })
}

(function () {
  chrome.browserAction.onClicked.addListener(function () {
    if (ws === undefined) {
      connect()
    }
  })
})()
