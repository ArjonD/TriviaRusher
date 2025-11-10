import { View, Text, StyleSheet } from 'react-native';
import AnswerButton from './AnswerButton';

type Props = {
    question: string;
    answers: string[];
    onSelectAnswer: (answer: string) => void;
}

export default function QuestionCard({ question, answers, onSelectAnswer }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.question}>{question}</Text>
            {answers.map((ans, i) => (
                <AnswerButton key={i} text={ans} onPress={() => onSelectAnswer(ans)} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "90%",
        backgroundColor: "#1B263B",
        padding: 20,
        borderRadius: 8,
    },
    question: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 12,
    },
});
