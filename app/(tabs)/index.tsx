import { fetchCategories, fetchQuestions } from '@/api/triviaApi';
import CategoryButton from '@/components/categoryButton';
import DifficultyButton from '@/components/difficultyButton';
import { Category, Difficulty } from '@/types/trivia';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuiz } from '@/contexts/QuizContext';

export default function Index() {
    const router = useRouter();
    const { setQuestions } = useQuiz();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

    useEffect(() => {
        async function loadCategories() {
            const result = await fetchCategories();
            setCategories(result);
        }
        loadCategories();
    }, []);

    const handleStartQuiz = async () => {
        if (!selectedCategory || !selectedDifficulty) {
            alert("Pick both category and difficulty first");
            return;
        }

        const questions = await fetchQuestions(
            10,
            selectedDifficulty,
            selectedCategory.id
        );

        setQuestions(questions);
        router.push("/quiz");
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <DifficultyButton onSelect={setSelectedDifficulty} />
                <CategoryButton categories={categories} onSelect={setSelectedCategory} />
            </View>
            <TouchableOpacity onPress={handleStartQuiz} style={styles.button}>
                <Text style={styles.buttonText}>Start Quiz</Text>
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
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        gap: 20,
    },
    button: {
        backgroundColor: "#417052",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
});
