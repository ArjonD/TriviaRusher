import { Stack } from "expo-router";

export default function RootLayout() {
    return (
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
                name="score.tsx"
                options={{
                    title: "Your Score",
                    headerStyle: { backgroundColor: "#56ff01ff" },
                    headerTintColor: "#fff"
                }}
            />
        </Stack>

    );
}