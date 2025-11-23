import AsyncStorage from '@react-native-async-storage/async-storage';

export type ScoreEntry = {
    id: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    date: string;
    category?: string;
    difficulty?: string;
};

const SCORES_KEY = '@trivia_scores';

export async function saveScore(scoreData: Omit<ScoreEntry, 'id' | 'date'>): Promise<void> {
    try {
        const existingScores = await getHighScores();
        
        const newScore: ScoreEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            ...scoreData
        };

        const updatedScores = [...existingScores, newScore];
        
        updatedScores.sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score;
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        const topScores = updatedScores.slice(0, 20);

        await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(topScores));
    } catch (error) {
        console.error('Error saving score:', error);
    }
}

export async function getHighScores(): Promise<ScoreEntry[]> {
    try {
        const scoresJson = await AsyncStorage.getItem(SCORES_KEY);
        if (scoresJson) {
            return JSON.parse(scoresJson);
        }
        return [];
    } catch (error) {
        console.error('Error getting high scores:', error);
        return [];
    }
}

export async function clearHighScores(): Promise<void> {
    try {
        await AsyncStorage.removeItem(SCORES_KEY);
    } catch (error) {
        console.error('Error clearing high scores:', error);
    }
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}