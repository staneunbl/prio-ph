
import { mockData } from '@/data/live-feed';
import { View } from 'react-native';
import WrapperTab from '../../components/WrapperTab';
import LiveFeed from './LiveFeed';

export default function FeedScreen() {
  return (
    <WrapperTab>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LiveFeed data={mockData} />
      </View>
    </WrapperTab>
  );
}