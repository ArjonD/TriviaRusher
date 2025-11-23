import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { useState, useMemo, useEffect } from 'react';
import QuestionCard from '@/components/QuestionCard';
import Timer from '@/components/Timer';
import { useQuiz } from '@/contexts/QuizContext';

export default function Quiz() {
    const router = useRouter();
    const { questions, score, addPoints, resetScore } = useQuiz();

    // Reset score when quiz starts
    useEffect(() => {
        resetScore();
    }, []);

    // Redirect if no questions
    if (!questions || questions.length === 0) {
        router.replace('/');
        return null;
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [timerKey, setTimerKey] = useState(0); 
    const [isTimerActive, setIsTimerActive] = useState(true);
    const currentQuestion = questions[currentIndex];

    const shuffledAnswers = useMemo(() => {
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimerKey(prev => prev + 1);
        setIsTimerActive(true);
        
        if (currentQuestion.options) {
            return currentQuestion.options;
        }
        
        if (currentQuestion.incorrect_answers) {
            const arr = [
                currentQuestion.correctAnswer,
                ...currentQuestion.incorrect_answers
            ];
            return arr.sort(() => Math.random() - 0.5);
        }
        
        return [];
    }, [currentIndex, currentQuestion]);

    const handleSelectAnswer = (selected: string) => {
        if (showFeedback) return;
        
        setSelectedAnswer(selected);
        setShowFeedback(true);
        setIsTimerActive(false);
        
        const isCorrect = selected === currentQuestion.correctAnswer;
        
        if (isCorrect) {
            addPoints(10); 
        }
        
        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setCurrentIndex(currentIndex + 1);
            } else {
                const finalScore = score + (isCorrect ? 10 : 0);
                router.replace('/score');
            }
        }, 1000);
    };

    const handleTimeUp = () => {
        if (showFeedback) return;
        
        setSelectedAnswer(null);
        setShowFeedback(true);
        setIsTimerActive(false);
        
        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setCurrentIndex(currentIndex + 1);
            } else {
                router.replace('/score');
            }
        }, 1000);
    };

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.progress}>
                    Question {currentIndex + 1} / {questions.length}
                </Text>
                <Text style={styles.score}>
                    Score: {score}
                </Text>
            </View>
            
            <Timer 
                key={timerKey}
                duration={10}
                onTimeUp={handleTimeUp}
                isActive={isTimerActive}
            />
            
            <QuestionCard 
                question={currentQuestion.question}
                answers={shuffledAnswers}
                onSelectAnswer={handleSelectAnswer}
                selectedAnswer={selectedAnswer}
                correctAnswer={currentQuestion.correctAnswer}
                showFeedback={showFeedback}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#25292e",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: 500,
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    progress: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    score: {
        color: "#56ff01ff",
        fontSize: 20,
        fontWeight: "bold",
    },
});