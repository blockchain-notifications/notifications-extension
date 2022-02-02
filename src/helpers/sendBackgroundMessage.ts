interface ISendBackgroundMessage {
  title: string
  message: string
  id: string
}

export const sendBackgroundMessage = ({ title, message, id }: ISendBackgroundMessage) => {
  chrome.runtime.sendMessage({title, message, id}, function(response) {
    console.log(response.farewell);
  });
}
