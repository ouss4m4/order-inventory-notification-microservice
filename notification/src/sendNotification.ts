export const sendNotification = (userId: string) => {
  userId = crypto.randomUUID();
  console.log(`Sending Notification To User Id: ${userId}`);
};
