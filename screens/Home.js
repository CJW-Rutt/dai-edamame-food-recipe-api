import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Recipies from '../components/Recipies';

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Recipies/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 20,
        borderColor: '#282828',
        padding: 20
    },
});
