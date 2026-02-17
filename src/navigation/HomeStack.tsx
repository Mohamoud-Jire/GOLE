import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Discussion from '../screens/Discussion';
import { COLORS } from '../utils/theme';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
                headerTintColor: COLORS.text.primary,
                headerTitleStyle: {
                    fontFamily: 'Inter-Bold',
                },
                contentStyle: {
                    backgroundColor: COLORS.background,
                },
            }}
        >
            <Stack.Screen
                name="FeedHome" // Unique name to avoid conflict with Tab name
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Discussion"
                component={Discussion}
                options={{ title: 'Discussion' }}
            />
        </Stack.Navigator>
    );
}
