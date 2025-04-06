import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/sign_in"> Sign In </Link>
      <Link href="/(root)/(tabs)/explore"> Explore </Link>
      <Link href="/profile"> Profile </Link>
      <Link href="/(root)/properties/[id]"> Properties </Link>
    </View>
  );
}
