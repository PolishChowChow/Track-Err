import ErrorListWrapper from "../components/ErrorList/ErrorListWrapper";
import Form from "../components/Form/Form";
import React, { useEffect } from "react";
import { CommonActions, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, Headline, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";

const Tab = createBottomTabNavigator();

export default function Layout() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    const routeName = route.name;
    navigation.setOptions({
      headerTitle: () => (
        <Headline
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.secondary,
          }}
        >
          {routeName === "Home" ? "Record creation" : "List of all records"}
        </Headline>
      ),
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTitleStyle: {
        color: theme.colors.primary,
      },
    });
  }, [navigation, route, theme]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        
      }}
      
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          
          theme={theme}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : "";
            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={ErrorListWrapper}
        options={{
          tabBarStyle : {
            backgroundColor: theme.colors.secondaryContainer
          },
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="view-list" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={Form}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="open-in-new" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
