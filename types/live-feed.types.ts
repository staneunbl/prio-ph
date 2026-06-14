export type FeedItem = {
  id: string;
  title: string;
  message: string;
  type?: 'alert' | 'info' | 'warning';
  time?: string;
};