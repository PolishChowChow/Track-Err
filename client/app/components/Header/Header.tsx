import { useState } from "react";
import { Appbar, Menu, TouchableRipple, MD3Theme } from "react-native-paper";
import CustomItem from "./CustomItem";
import { useMainContext } from "@/context/MainContextProvider";
import { referenceType } from "@/types/referenceType";

type HeaderProps = {
  route: string;
  theme: MD3Theme & { toggleTheme: () => void };
};
export default function Header({ route, theme }: HeaderProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { filter, updateFilter } = useMainContext();
  const handlePress = (label: string) => {
    updateFilter(label as referenceType);
    setIsMenuVisible(false)
  };

  return (
    <Appbar.Header>
      <Appbar.Content title={route === "Home" ? "List" : "Record creation"} />
      <Menu
        visible={isMenuVisible}
        onDismiss={() => setIsMenuVisible(prev => !prev)}
        anchor={
          <TouchableRipple
            onPress={() => {
              setIsMenuVisible(true);
            }}
          >
            <Appbar.Action icon="cog" />
          </TouchableRipple>
        }
        statusBarHeight={50}
      >
        <CustomItem
          label="ALL"
          selectedValue={filter}
          onPress={handlePress}
          color={theme.colors.secondary}
        />
        <CustomItem
          label="MPDB"
          selectedValue={filter}
          onPress={handlePress}
          color={theme.colors.secondary}
        />
        <CustomItem
          label="ICE"
          selectedValue={filter}
          onPress={handlePress}
          color={theme.colors.secondary}
        />
        <CustomItem
          label="TRYOUT"
          selectedValue={filter}
          onPress={handlePress}
          color={theme.colors.secondary}
        />
      </Menu>
      <Appbar.Action
        icon={theme.dark ? "white-balance-sunny" : "brightness-2"}
        onPress={theme.toggleTheme}
      />
    </Appbar.Header>
  );
}
