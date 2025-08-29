import { Stack } from 'expo-router';
import { Provider } from 'mobx-react';
import userStore from '../store';

export default function Layout() {
    return (
        <Provider store={userStore}>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="Login" />
            <Stack.Screen name="Mensajes" />
            <Stack.Screen name="tabs" />
        </Stack>
        </Provider>
    );
}