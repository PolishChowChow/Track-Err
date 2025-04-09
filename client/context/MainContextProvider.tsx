import { referenceType } from "@/types/ReferenceType";
import { createContext, useContext, useState } from "react";

type MainContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type mainContextType = {
  filter: referenceType;
  updateFilter: (newFilter: referenceType) => void;
};
const MainContext = createContext<mainContextType>({
  filter: "ALL",
  updateFilter: (newFilter: referenceType) => {},
});

export default function MainContextProvider({
  children,
}: MainContextProviderProps) {
  const [filter, setFilter] = useState<referenceType>("ALL");
  const updateFilter = (newFilter: referenceType) => {
    setFilter(newFilter);
  };
  return (
    <MainContext.Provider value={{ filter, updateFilter }}>
      {children}
    </MainContext.Provider>
  );
}
export const useMainContext = () => useContext(MainContext);
