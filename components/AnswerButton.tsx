import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
    text: string;
    onPress: () => void;
    isSelected?: boolean;
    isCorrect?: boolean;
    showFeedback?: boolean;
};

export default function AnswerButton({ text, onPress, isSelected, isCorrect, showFeedback }: Props) {
    const getButtonStyle = () => {
        if (!showFeedback) return styles.button;
        
        if (isCorrect) {
            return [styles.button, styles.correctButton];
        }
        
        if (isSelected && !isCorrect) {
            return [styles.button, styles.wrongButton];
        }
        
        return [styles.button, styles.dimmedButton];
    };

    return (
        <TouchableOpacity style={getButtonStyle()} onPress={onPress} disabled={showFeedback}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#415A77",
        padding: 16,
        borderRadius: 10,
        marginVertical: 8,
        width: "100%",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "transparent",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    correctButton: {
        backgroundColor: "#4CAF50",
        borderColor: "#2E7D32",
    },
    wrongButton: {
        backgroundColor: "#F44336",
        borderColor: "#C62828",
    },
    dimmedButton: {
        backgroundColor: "#2C3E50",
        opacity: 0.5,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    }
});
