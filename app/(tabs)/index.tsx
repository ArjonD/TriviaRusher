import { fetchCategories, fetchQuestions } from '@/api/triviaApi';
import CategoryButton from '@/components/CategoryButton';
import DifficultyButton from '@/components/DifficultyButton';
import { Category, Difficulty } from '@/types/trivia';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { useQuiz } from '@/contexts/QuizContext';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
    const router = useRouter();
    const { setQuestions, setCategory, setDifficulty } = useQuiz();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
    
    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(50);
    const logoRotate = new Animated.Value(0);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();

        Animated.loop(
            Animated.timing(logoRotate, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();

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
        setCategory(selectedCategory);
        setDifficulty(selectedDifficulty);
        
        router.push("/quiz");
    };

    const logoRotateInterpolate = logoRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.header,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <Animated.View
                    style={{
                        transform: [{ rotate: logoRotateInterpolate }]
                    }}
                >
                    <Ionicons name="flash" size={48} color="#417052" style={styles.logo} />
                </Animated.View>
                <Text style={styles.title}>TriviaRusher</Text>
                <Text style={styles.subtitle}>Test your knowledge!</Text>
            </Animated.View>

            <Animated.View 
                style={[
                    styles.selectionSection,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <Text style={styles.sectionTitle}>Setup Your Quiz</Text>
                
                <View style={styles.selectionCard}>
                    <Text style={styles.cardLabel}>Choose Difficulty</Text>
                    <DifficultyButton onSelect={setSelectedDifficulty} />
                </View>

                <View style={styles.selectionCard}>
                    <Text style={styles.cardLabel}>Choose Category</Text>
                    <CategoryButton categories={categories} onSelect={setSelectedCategory} />
                </View>
            </Animated.View>

            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }}
            >
                <TouchableOpacity 
                    onPress={handleStartQuiz} 
                    style={[
                        styles.startButton, 
                        (!selectedCategory || !selectedDifficulty) && styles.startButtonDisabled
                    ]}
                    disabled={!selectedCategory || !selectedDifficulty}
                >
                    <Ionicons name="play" size={24} color="#fff" style={styles.playIcon} />
                    <Text style={styles.startButtonText}>Start Quiz</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View 
                style={[
                    styles.instructions,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <Text style={styles.instructionText}>
                    Select both difficulty and category to begin
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40,
    },
    logo: {
        marginBottom: 10,
        textShadowColor: 'rgba(65, 112, 82, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    title: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        color: "#aaa",
        fontSize: 18,
        textAlign: "center",
        fontStyle: "italic",
    },
    selectionSection: {
        flex: 1,
        width: "100%",
        maxWidth: 400,
        alignSelf: "center",
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24,
    },
    selectionCard: {
        backgroundColor: "#1B263B",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    cardLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        textAlign: "center",
    },
    startButton: {
        backgroundColor: "#417052",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        maxWidth: 300,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    startButtonDisabled: {
        backgroundColor: "#666",
        shadowOpacity: 0,
        elevation: 0,
    },
    playIcon: {
        marginRight: 10,
    },
    startButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    instructions: {
        alignItems: "center",
        paddingBottom: 20,
    },
    instructionText: {
        color: "#aaa",
        fontSize: 14,
        textAlign: "center",
        fontStyle: "italic",
    },
});
