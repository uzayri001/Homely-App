import { Text, SafeAreaView, ScrollView, View, Image, TouchableOpacity, FlatList, Button, ActivityIndicator } from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { FeaturedCards, Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { useLocalSearchParams, router } from "expo-router";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppWrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

// This is the main screen for the app. It displays the latest properties and allows the user to search for properties.
export default function Index() {

const user = useGlobalContext();
const params = useLocalSearchParams<{filter?: string; query?: string;}>();
const {data: latestProperties, loading: latestPropertiesLoading} = useAppwrite({fn: getLatestProperties})
const {data: properties, loading, refetch} = useAppwrite({fn: getProperties, params: {
  filter: params.filter!, 
  query: params.query!,
  limit: 6 },
  skip: true
})

const handlePress = (id: string) => {
  router.push(`/properties/${id}`);
}

useEffect(() => {
  refetch({
    filter: params.filter!,
    query: params.query!,
    limit: 6
  });
}, [params.filter, params.query])

  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      {/* Using contentContainerStyle to prevent content from being cut off at the bottom */}
      <FlatList 
        data={properties}
        renderItem={({item}) => <Card item = {item} onPress={() => handlePress(item.$id)} />}
        contentContainerClassName="pb-32"
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="flex gap-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent=
        {
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" className="text-primary-300 mt-5"/>
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={ 
        <View className="px-5">
          {/* Header row with user info on left and bell icon on right */}
          <View className="flex flex-row justify-between items-center mt-5">
            {/* User info row */}
            <View className="flex flex-row items-center">
              {/* User avatar */}
              <Image source={{uri: user?.user?.avatar}} className="size-12 rounded-full"/>
              {/* User Name and Greeting column */}
              <View className="flex flex-col items-start ml-2 justify-center">
                {/* Greeting */}
                <Text className="text-xs font-rubik text-black-100"> Good Morning, </Text>
                <Text className="text-base font-rubik-Medium text-black-300"> {user?.user?.name} </Text>
              </View>
            </View>
            {/* Bell icon on right hand side */}
            <Image source={icons.bell} className="size-6"/>
          </View>
          <Search />
          {/* Featured section */}
          <View className="my-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-Bold text-black-300"> Featured </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-Bold text-primary-300"> View All </Text>
              </TouchableOpacity>
            </View>
            {latestPropertiesLoading ? (
              <ActivityIndicator size="large" color="#0000ff" className="text-primary-300 mt-5"/>
            ) : !latestProperties || latestProperties.length === 0 ? (
              <NoResults />
            ) : (
              <FlatList data={latestProperties} 
                renderItem={({item}) => <FeaturedCards item = {item} onPress={() => handlePress(item.$id)}/>} 
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5 mt-5"
              bounces={false}
            />
            )}
          </View>
          {/* Recommended section */}
          <View className="my-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-Bold text-black-300"> Our Reccomendations </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-Bold text-primary-300"> View All </Text>
              </TouchableOpacity>
            </View>
  
            <Filters />
          </View>
        </View>} />
    </SafeAreaView>
  );
}
