import { StyleSheet, Text, View , ScrollView, StatusBar} from 'react-native';
import Pokemon from './components/Pokemon';

export default function App() {
  StatusBar.setHidden(true);
  return (
    <View>
    <Pokemon />
    </View>
  );
}