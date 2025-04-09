import { useState } from "react";
import {
  Appbar,
  Menu,
  TouchableRipple,
  MD3Theme,
} from "react-native-paper";
import CustomItem from "./CustomItem";

type HeaderProps = {
  route: string;
  theme: MD3Theme & { toggleTheme: () => void };
};
export default function Header({ route, theme }: HeaderProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedReference, setSelectedReference] = useState("ALL")

  const handlePress = (label: string) => {
    setSelectedReference(label);
  }

  return (
    <Appbar.Header>
      <Appbar.Content title={route === "Home" ? "List" : "Record creation"} />
      <Menu
        visible={isMenuVisible}
        onDismiss={() => setIsMenuVisible(false)}
        anchor={
          <TouchableRipple
            onPress={() =>
              setIsMenuVisible(true)
            }
          >
            <Appbar.Action icon="cog" />
          </TouchableRipple>
        }
        statusBarHeight={50}
      >
        <CustomItem label="ALL" selectedValue={selectedReference} onPress={handlePress} color={theme.colors.secondary} />
        <CustomItem label="MPDB" selectedValue={selectedReference} onPress={handlePress} color={theme.colors.secondary} />
        <CustomItem label="ICE" selectedValue={selectedReference} onPress={handlePress} color={theme.colors.secondary} />
        <CustomItem label="TRYOUT" selectedValue={selectedReference} onPress={handlePress} color={theme.colors.secondary} />
      </Menu>
      <Appbar.Action
        icon={theme.dark ? "white-balance-sunny" : "brightness-2"}
        onPress={theme.toggleTheme}
      />
    </Appbar.Header>
  );
}
