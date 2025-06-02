import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Ionicons } from '@expo/vector-icons';
import Reportes from './Reportes';
import Tickets from './Tickets';

const Tab = createBottomTabNavigator();

export default function Head() {  
return (
    <Tab.Navigator screenOptions={{ headerShown: false,
    tabBarActiveBackgroundColor: "#242f66",
    tabBarInactiveTintColor: "#242f66",
    tabBarActiveTintColor: "white",
    }}>

    <Tab.Screen 
    name="Reportes" 
    component={Reportes}
    options={{
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="bug-sharp" color={ color } size={ size } />
        ),
        tabBarLabel: 'Reportes',
        tabBarLabelStyle: {
        fontSize: 14,
        }
    }}
    />
    <Tab.Screen
    name="Mis tickets"
    component={Tickets} 
    options={{
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="library" color={ color } size={ size } />
        ),
        tabBarLabel: 'Mis tickets',
        tabBarLabelStyle: {
        fontSize: 14,
        }
    }}
    />
    
    </Tab.Navigator>
);
}