import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function NotFound() {
    const router = useRouter();
    return (
        <View style={styles.container} >
            <Text style={styles.text}>
                Page not found
            </Text>
            {/* @ts-ignore: '/' antaa error, koska index on (tabs) sisällä ja /(tabs)/index ei toimi */}
            <Button title="Return to Home screen" onPress={() => router.push('/')} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#25292e",
    },
    text: {
        color: "white",
    },
})