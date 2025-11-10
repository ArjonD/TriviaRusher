import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useState, useMemo } from 'react';
import QuestionCard from '@/components/QuestionCard';

export default function Quiz() {
    const { questions } = useLocalSearchParams();
    const parsedQuestions = JSON.parse(questions as string);

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = parsedQuestions[currentIndex];

    const shuffledAnswers = useMemo(() => {
        const arr = [
            currentQuestion.correct_answer,
            ...currentQuestion.incorrect_answers
        ];
        return arr.sort(() => Math.random() - 0.5);
    }, [currentIndex]);

    const handleSelectAnswer = (selected: string) => {
        //Score stacker here
        if (currentIndex + 1 < parsedQuestions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            //Navigate to score screen here
            alert("Quiz finished!");
        }
    };

    return (
        <View style={styles.container} >
            <Text style={styles.progress}>
                Question {currentIndex + 1} / {parsedQuestions.length}
            </Text>
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
    progress: {
        color: "#fff",
        marginBottom: 16,
        fontSize: 16,
    },
});