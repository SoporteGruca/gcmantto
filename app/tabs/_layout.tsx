// app/TabsLayout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {  
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#242f66",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            height: 60,
            },
            tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            },
        }}>

        <Tabs.Screen 
            name="Reportes"
            options={{
            title: "Reportes",
            tabBarIcon: ({ color, size, focused }) => (
                <Ionicons 
                name={focused ? "bug-sharp" : "bug-outline"} 
                color={color} 
                size={size} 
                />
            ),
            tabBarLabel: "Reportes",
            }}
        />

        <Tabs.Screen 
            name="Tickets"
            options={{
            title: "Mis Tickets",
            tabBarIcon: ({ color, size, focused }) => (
                <Ionicons 
                name={focused ? "library" : "library-outline"} 
                color={color} 
                size={size} 
                />
            ),
            tabBarLabel: "Mis Tickets",
            }}
        />
        </Tabs>
    );
}