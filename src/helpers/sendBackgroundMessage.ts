interface ISendBackground {
  title?: string
  message?: string
  id?: string
  type: string
}

export const sendBackgroundMessage = ({type,  title, message, id }: ISendBackground) => {
  chrome.runtime.sendMessage({ type, title, message, id})
}
