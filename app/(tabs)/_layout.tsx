import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#417052ff', //Tabs väri kun on valittu sivu
                tabBarInactiveTintColor: 'gray', //Tabs väri kun ei ole valittu sivu (Vaihda myöhemmin vain esimerkki)
                headerStyle: { backgroundColor: '#25292e' },
                headerTintColor: 'white',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    title: 'Quiz', headerShown: false
                }}
            />
            <Tabs.Screen
                name="high-scores"
                options={{
                    title: 'High Scores'
                }}
            />
        </Tabs>

    );
}