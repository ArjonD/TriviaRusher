import { Category, Difficulty, Question } from '../types/trivia';
import { decodeText } from '@/utilities/htmlDecoder';

const BASE_URL = 'https://opentdb.com/';

//Get categories
export async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}api_category.php`);
    const data = await response.json();

    return data.trivia_categories.map((category: any) => ({
        id: category.id,
        name: decodeText(category.name),
    }));
}

//Get trivia question based on user input
export async function fetchQuestions(
    amount: number = 10,
    difficulty: Difficulty = "easy",
    categoryId?: number
): Promise<Question[]> {

    const url = new URL(`${BASE_URL}/api.php`);
    url.searchParams.set("amount", String(amount));
    url.searchParams.set("difficulty", difficulty);
    url.searchParams.set("type", "multiple");

    if (categoryId) {
        url.searchParams.set("category", String(categoryId));
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    return data.results.map((quest: any): Question => {
        const question = decodeText(quest.question);
        const correctAnswer = decodeText(quest.correct_answer);
        const incorrect = quest.incorrect_answers.map((incans: string) => decodeText(incans));
        const options = shuffleArray([correctAnswer, ...incorrect]);

        return { question, correctAnswer, options };
    });
}

function shuffleArray<T>(arr: T[]): T[] {
    return arr
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((o) => o.value);
}