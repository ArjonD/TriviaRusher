import { Difficulty } from '@/types/trivia';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

type Props = {
    onSelect?: (difficulty: Difficulty | null) => void;
};

const DifficultyButton: React.FC<Props> = ({ onSelect }) => {
    const [index, setIndex] = useState<number | null>(null);

    const handlePress = () => {
        const newIndex = index === null ? 0 : (index + 1) % difficulties.length;
        setIndex(newIndex);
        if (onSelect) onSelect(difficulties[newIndex]);
    };


    const getLabel = () => {
        if (index === null) return 'Select difficulty';


        const difficulty = difficulties[index];
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.text}>{getLabel()}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#417052",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default DifficultyButton;