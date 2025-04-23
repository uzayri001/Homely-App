import { View, Text, SafeAreaView, ScrollView, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Carousel from 'react-native-reanimated-carousel';
import { getPropertyById } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppWrite';
import images from '@/constants/images';
import icons from '@/constants/icons';

interface Property {
  $id: string;
  name?: string;
  imageUrls: string[];
  address?: string;
}

interface PropertyParams extends Record<string, string | number> {
  id: string;
}

const Property = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const {data: property} = useAppwrite<Property | null, PropertyParams>({fn: getPropertyById, params: {id: id!},});
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 bg-white">
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <View className="absolute top-4 left-4 z-10">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="bg-white p-2 rounded-full">
                <Image source={icons.backArrow} className="w-6 h-6"/>
              </View>
            </TouchableOpacity>
          </View>
          <View className="absolute top-4 right-4 z-10 flex flex-row gap-2">
            <View className="p-2 rounded-full bg-white">
              <Image
                source={icons.heart}
                className="size-7"
                tintColor={"#191D31"}
              />
            </View>
            <View className="p-2 rounded-full bg-white">
              <Image source={icons.send} className="size-7" tintColor={"#191D31"}/>
            </View>
          </View>
          <Carousel
            data={property?.imageUrls || []}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item as string }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            )}
            autoPlay
            loop
            width={windowWidth}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 16,
              overflow: 'hidden'
            }}
          />
        </View>
        <View className="flex flex-row items-center justify-between px-4">
          <View className="flex flex-row items-center gap-2">
            <Text className="text-2xl font-rubik-ExtraBold text-black-300">{property?.name}</Text>
            <Text className="text-sm font-rubik-Medium text-black-200">{property?.address}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Property;