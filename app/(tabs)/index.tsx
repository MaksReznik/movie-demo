import { Text, View } from 'react-native';
import '../globals.css';
import { Link } from 'expo-router';
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text text-primary className="text-5xl">
        Hi.
      </Text>
      <Link href="/onboarding">Onboarding</Link>
    </View>
  );
}
