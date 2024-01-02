export interface IMessage {
  chat_id: string;
  message_id: string;
  user_id: string;
  user_name: string;
  avatar: string;
  message_type: string;
  content: string;
  attachments: string[];
  createdAt: string;
  assessed?: boolean;
}
