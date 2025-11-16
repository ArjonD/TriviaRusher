import { View, Text, StyleSheet } from 'react-native';
import AnswerButton from './AnswerButton';

type Props = {
    question: string;
    answers: string[];
    onSelectAnswer: (answer: string) => void;
    selectedAnswer?: string | null;
    correctAnswer?: string;
    showFeedback?: boolean;
}

export default function QuestionCard({ 
    question, 
    answers, 
    onSelectAnswer,
    selectedAnswer,
    correctAnswer,
    showFeedback 
}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.question}>{question}</Text>
            {answers.map((ans, i) => (
                <AnswerButton 
                    key={i} 
                    text={ans} 
                    onPress={() => onSelectAnswer(ans)}
                    isSelected={showFeedback && selectedAnswer === ans}
                    isCorrect={showFeedback && correctAnswer === ans}
                    showFeedback={showFeedback || false}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#1B263B",
        padding: 24,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    question: {
        color: "#fff",
        fontSize: 20,
        marginBottom: 24,
        textAlign: "center",
        fontWeight: "600",
        lineHeight: 28,
    },
});
