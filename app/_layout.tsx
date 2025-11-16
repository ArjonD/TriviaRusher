import { Stack } from "expo-router";
import { QuizProvider } from "@/contexts/QuizContext";

export default function RootLayout() {
    return (
        <QuizProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="+not-found"
                    options={{
                        headerTitle: "Oops!",
                        headerStyle: { backgroundColor: "grey" },
                        headerTintColor: "white"
                    }}
                />
                <Stack.Screen
                    name="score"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="quiz"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </QuizProvider>
    );
}