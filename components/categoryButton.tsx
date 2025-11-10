import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Category } from "@/types/trivia";

type Props = {
    categories: Category[];
    onSelect?: (category: Category | null) => void;
};

const CategoryButton: React.FC<Props> = ({ categories, onSelect }) => {
    const [index, setIndex] = useState<number | null>(null);

    const handlePress = () => {
        if (categories.length === 0) return;

        const nextIndex = index === null ? 0 : (index + 1) % categories.length;
        setIndex(nextIndex);

        onSelect?.(categories[nextIndex]);
    };

    const getLabel = () => {
        return index === null
            ? "Select category"
            : categories[index].name;
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.text}>{getLabel()}</Text>
        </TouchableOpacity>
    );
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

export default CategoryButton;
