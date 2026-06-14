import { FeedItem } from "@/types/live-feed.types";

export const mockData: FeedItem[] = [
  {
    id: '1',
    title: 'Flood Alert',
    message: 'High water level detected in Manila Bay area. Stay safe.',
    type: 'alert',
    time: '2 min ago',
  },
  {
    id: '2',
    title: 'Weather Update',
    message: 'Light rains expected in NCR region this afternoon.',
    type: 'info',
    time: '10 min ago',
  },
  {
    id: '3',
    title: 'System Notice',
    message: 'Emergency response system is active and monitoring.',
    type: 'warning',
    time: '1 hr ago',
  },
];