import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
    text: string;
    onPress: () => void;
};

export default function AnswerButton({ text, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#415A77",
        padding: 12,
        borderRadius: 8,
        marginVertical: 6,
        width: 250,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
    }
});
