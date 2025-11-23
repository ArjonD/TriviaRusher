import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#417052ff', 
                tabBarInactiveTintColor: 'gray',
                headerStyle: { backgroundColor: '#25292e' },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                    borderTopColor: '#415A77',
                    borderTopWidth: 1,
                    paddingTop: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: 5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />      
            <Tabs.Screen
                name="high-scores"
                options={{
                    title: 'High Scores',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="leaderboard" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>

    );
}