export type Category = {
    id: number;
    name: string;
};

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Question = {
    question: string;
    correctAnswer: string;
    options: string[];
    incorrect_answers?: string[];
};