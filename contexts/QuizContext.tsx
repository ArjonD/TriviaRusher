import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question } from '@/types/trivia';

type QuizContextType = {
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
    score: number;
    setScore: (score: number) => void;
    addPoints: (points: number) => void;
    resetScore: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [score, setScore] = useState(0);

    const addPoints = (points: number) => {
        setScore(prev => prev + points);
    };

    const resetScore = () => {
        setScore(0);
    };

    return (
        <QuizContext.Provider value={{ 
            questions, 
            setQuestions, 
            score, 
            setScore, 
            addPoints, 
            resetScore 
        }}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within QuizProvider');
    }
    return context;
}
