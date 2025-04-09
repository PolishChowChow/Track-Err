import ErrorListWrapper from "../components/ErrorList/ErrorListWrapper";
import Form from "../components/Form/Form";
import React, { useEffect } from "react";
import {
  CommonActions,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Appbar,
  BottomNavigation,
  Divider,
  Headline,
  MD3Theme,
  Menu,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import { Button, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import Header from "../components/Header/Header";
const Tab = createBottomTabNavigator();

export default function Layout() {
  const theme = useTheme() as MD3Theme & { toggleTheme: () => void };
  const navigation = useNavigation();
  const route = useRoute();
  const navigationState = useNavigationState((state) => state);

  const currentRoute = navigationState.routes[navigationState.index];

  const getActiveRoute = (route) => {
    if (route.state && route.state.index != null) {
      return getActiveRoute(route.state.routes[route.state.index]);
    }
    return route;
  };
  const activeRoute = getActiveRoute(currentRoute);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header theme={theme} route={activeRoute} />,
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTitleStyle: {
        color: theme.colors.primary,
      },
    });
    NavigationBar.setBackgroundColorAsync(theme.colors.background);
    NavigationBar.setButtonStyleAsync(theme.dark ? "light" : "dark");
  }, [navigation, route, theme, currentRoute]);
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
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
            tabBarStyle: {
              backgroundColor: theme.colors.secondaryContainer,
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
    </>
  );
}
