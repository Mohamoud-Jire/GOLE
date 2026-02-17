import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, PlusSquare, User } from 'lucide-react-native';
import { COLORS, FONTS } from '../utils/theme';

// Screens
import HomeStack from './HomeStack'; // We will create this next
import Create from '../screens/Create';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.card,
                    borderTopColor: COLORS.divider,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.text.secondary,
                tabBarLabelStyle: {
                    fontFamily: FONTS.medium,
                    fontSize: 12,
                }
            }}
        >
            <Tab.Screen
                name="Feed"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Create"
                component={Create}
                options={{
                    tabBarIcon: ({ color, size }) => <PlusSquare color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
}
