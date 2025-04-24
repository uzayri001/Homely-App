import { View, Text, SafeAreaView, ScrollView, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import {useEffect, useState} from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Carousel from 'react-native-reanimated-carousel';
import { getPropertyById, getReviewCountByPropertyId } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppWrite';
import images from '@/constants/images';
import icons from '@/constants/icons';
import React from 'react';

interface Property {
  $id: string;
  name?: string;
  imageUrls: string[];
  address?: string;
  type?: string;
  rating?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

interface PropertyParams extends Record<string, string | number> {
  id: string;
}

const Property = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const {data: property} = useAppwrite<Property | null, PropertyParams>({fn: getPropertyById, params: {id: id!},});
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchReviewCount = async () => {
      if (id) {
        const count = await getReviewCountByPropertyId(id);
        setReviewCount(count);
      }
    };

    fetchReviewCount();
  }, [id]);

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
        <View className="flex flex-col items-start justify-between px-4">
          <Text className="text-2xl font-rubik-ExtraBold text-black-300">{property?.name}</Text>
          <View className="flex flex-row items-center gap-2 mt-2">
            <Text className='text-base font-rubik-Medium text-primary-300 bg-primary-200 rounded-full px-4'>{property?.type}</Text>
            <Image source={icons.star} className="size-5"/>
            <Text className="text-black-100 text-base font-rubik-Medium">{property?.rating}</Text>
            <Text className="text-black-100 text-base font-rubik-Medium"> ({reviewCount} Reviews)</Text>
          </View>
            <View className="flex flex-row flex-1 items-center gap-2 mt-7">
              <View className="bg-primary-200 rounded-full p-1">
                <Image source={icons.bed} className='size-5'/>
              </View>
              <Text className="text-black-100 text-base font-rubik-Medium">{property?.bedrooms} Bedrooms</Text>
              <View className="bg-primary-200 rounded-full p-1">
                <Image source={icons.bath} className='size-5'/>
              </View>
              <Text className="text-black-100 text-base font-rubik-Medium">{property?.bathrooms} Bathrooms</Text>
              <View className="bg-primary-200 rounded-full p-1">
                <Image source={icons.area} className='size-5'/>
              </View>
              <Text className="text-black-100 text-base font-rubik-Medium"> {property?.area} sqft</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Property;