import { clearHighScores, formatDate, getHighScores, ScoreEntry } from '@/utilities/scoreStorage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HighScores() {
    const [scores, setScores] = useState<ScoreEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const loadScores = useCallback(async () => {
        setLoading(true);
        const highScores = await getHighScores();
        setScores(highScores);
        setLoading(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadScores();
        }, [loadScores])
    );

    

    const renderScoreItem = ({ item, index }: { item: ScoreEntry; index: number }) => (
        <View style={styles.scoreItem}>
            <View style={styles.rankContainer}>
                <Text style={styles.rank}>#{index + 1}</Text>
            </View>

            <View style={styles.scoreDetails}>
                <View style={styles.scoreHeader}>
                    <Text style={styles.scoreValue}>{item.score}</Text>
                    <Text style={styles.percentage}>{item.percentage}%</Text>
                </View>

                <Text style={styles.gameDetails}>
                    {item.totalQuestions} questions • {item.difficulty || 'Unknown'} • {item.category || 'Mixed'}
                </Text>

                <Text style={styles.date}>{formatDate(item.date)}</Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading scores...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>High Scores</Text>

            {scores.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No high scores yet!</Text>
                    <Text style={styles.emptySubtext}>Play a quiz to set your first score.</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={scores}
                        renderItem={renderScoreItem}
                        keyExtractor={(item) => item.id}
                        style={styles.scoresList}
                        showsVerticalScrollIndicator={false}
                    />

                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        padding: 20,
    },
    title: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    loadingText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    emptySubtext: {
        color: "#aaa",
        fontSize: 16,
    },
    scoresList: {
        flex: 1,
    },
    scoreItem: {
        flexDirection: "row",
        backgroundColor: "#1B263B",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    rankContainer: {
        justifyContent: "center",
        marginRight: 16,
    },
    rank: {
        color: "#56ff01ff",
        fontSize: 24,
        fontWeight: "bold",
    },
    scoreDetails: {
        flex: 1,
    },
    scoreHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    scoreValue: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    percentage: {
        color: "#56ff01ff",
        fontSize: 18,
        fontWeight: "bold",
    },
    gameDetails: {
        color: "#aaa",
        fontSize: 14,
        marginBottom: 4,
        textTransform: "capitalize",
    },
    date: {
        color: "#666",
        fontSize: 12,
    },
});