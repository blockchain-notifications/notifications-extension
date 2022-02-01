interface ISendNotification {
  title: string
  message: string
  id: string
}

export const sendNotificationMessage = ({ title, message, id }: ISendNotification) => {
  chrome.runtime.sendMessage({title, message, id}, function(response) {
    console.log(response.farewell);
  });
}
