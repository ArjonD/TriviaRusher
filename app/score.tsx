import { useQuiz } from '@/contexts/QuizContext';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { saveScore } from '@/utilities/scoreStorage';

export default function Score() {
    const router = useRouter();
    const { score, questions, category, difficulty } = useQuiz();

    const totalQuestions = questions.length;
    const maxScore = totalQuestions * 10;
    const percentage = totalQuestions > 0 ? Math.round((score / maxScore) * 100) : 0;

    useEffect(() => {
        const saveCurrentScore = async () => {
            if (totalQuestions > 0) {
                await saveScore({
                    score,
                    totalQuestions,
                    percentage,
                    category: category?.name,
                    difficulty: difficulty || 'unknown'
                });
            }
        };
        
        saveCurrentScore();
    }, [score, totalQuestions, percentage, category, difficulty]);

    const getPerformanceMessage = () => {
        if (percentage === 100) return "Perfect! 🎉";
        else if (percentage >= 80) return "Excellent! 🌟";
        else if (percentage >= 60) return "Good Job! 👍";
        else if (percentage >= 40) return "Not Bad! 💪";
        return "Keep Practicing! 📚";
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quiz Completed!</Text>

            <View style={styles.scoreCard}>
                <Text style={styles.performanceText}>{getPerformanceMessage()}</Text>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>Your Score</Text>
                    <Text style={styles.scoreValue}>{score}</Text>
                    <Text style={styles.maxScore}>out of {maxScore}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{percentage}%</Text>
                        <Text style={styles.statLabel}>Accuracy</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{score / 10}/{totalQuestions}</Text>
                        <Text style={styles.statLabel}>Correct</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/')}
            >
                <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
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
    title: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
    },
    scoreCard: {
        backgroundColor: "#1B263B",
        borderRadius: 16,
        padding: 32,
        width: "100%",
        maxWidth: 400,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        marginBottom: 30,
    },
    performanceText: {
        color: "#56ff01ff",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
    },
    scoreContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    scoreLabel: {
        color: "#aaa",
        fontSize: 16,
        marginBottom: 8,
    },
    scoreValue: {
        color: "#56ff01ff",
        fontSize: 64,
        fontWeight: "bold",
    },
    maxScore: {
        color: "#aaa",
        fontSize: 18,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#415A77",
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    statLabel: {
        color: "#aaa",
        fontSize: 14,
        marginTop: 4,
    },
    button: {
        backgroundColor: "#417052",
        padding: 16,
        borderRadius: 10,
        width: "100%",
        maxWidth: 300,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});