// Create a new Search component that will be reused on multiple pages

import { View, TextInput, Image, SafeAreaView, Text, TouchableOpacity } from "react-native";
import icons from "@/constants/icons";
import { usePathname, useLocalSearchParams, router} from "expo-router";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {

    // Get the current path/route of the app
    const path = usePathname();
    // Get any URL search parameters from the current route
    const params = useLocalSearchParams<{query?: string}>();
    // Initialize search state with URL query parameter if it exists, otherwise empty string
    const [search, setSearch] = useState(params.query);

    // Debounce the search input to prevent excessive API calls
    const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({query: text}), 500);

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }

  return (
    <SafeAreaView className="flex flex-row items-center justify-between px-5 py-3 w-full px-4 rounded-lg bg-accent-100 border 
    border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          placeholder="Search"
          className="text-sm font-rubik text-black-300"
          value={search}
          onChangeText={handleSearch}
        /> 
      </View>
      <TouchableOpacity className="flex flex-row items-center justify-center">
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Search;