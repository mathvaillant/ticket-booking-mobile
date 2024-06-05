import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export const useOnScreenFocusCallback = (callback: () => void) => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", callback);
    return unsubscribe;
  }, [navigation, callback]);
};
