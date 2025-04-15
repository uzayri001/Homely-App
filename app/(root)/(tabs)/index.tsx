import { Text, SafeAreaView, ScrollView, View, Image, TouchableOpacity } from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { FeaturedCards, Card } from "@/components/Cards";
import Filters from "@/components/Filters";

export default function Index() {
  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      {/* Using contentContainerStyle to prevent content from being cut off at the bottom */}
      <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 80 }}>
        {/*  */}
        {/* Header row with user info on left and bell icon on right */}
        <View className="flex flex-row justify-between items-center mt-5">
          {/* User info row */}
          <View className="flex flex-row items-center">
            {/* User avatar */}
            <Image source={images.avatar} className="size-12 rounded-full"/>
            {/* User Name and Greeting column */}
            <View className="flex flex-col items-start ml-2 justify-center">
              {/* Greeting */}
              <Text className="text-xs font-rubik text-black-100"> Good Morning, </Text>
              <Text className="text-base font-rubik-Medium text-black-300"> Uzayr </Text>
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
          <View className="flex flex-row gap-5 mt-5">
            {/* TODO: Replace hardcoded cards with dynamic rendering using FlatList or ScrollView
            Example implementation:
            <FlatList
              data={featuredProperties}
              renderItem={({ item }) => <FeaturedCards property={item} onPress={() => {}} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 20 }}
            />
            */}
            <FeaturedCards onPress={() => {}}/>
            <FeaturedCards onPress={() => {}}/>
          </View>
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

          <View className="flex flex-row gap-5 mt-5">
            {/* TODO: Replace hardcoded cards with dynamic rendering using FlatList or ScrollView
            Example implementation:
            <FlatList
              data={recommendedProperties}
              renderItem={({ item }) => <Card property={item} onPress={() => {}} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 20 }}
            />
            */}
            <Card onPress={() => {}}/>
            <Card onPress={() => {}}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
