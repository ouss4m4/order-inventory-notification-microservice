export const NOTIFICATION_SENT = "notification.sent";

export interface NotificationSentPayload {
  userId: string;
  type: "email" | "sms";
  content: string;
  sentAt: string;
}
