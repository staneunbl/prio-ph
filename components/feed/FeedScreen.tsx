import { View } from 'react-native';
import WrapperTab from '../../components/WrapperTab';

export default function FeedScreen() {
  return (
    <WrapperTab title="PRIO PH!">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Home Screen Content</Text> */}
      </View>
    </WrapperTab>
  );
}