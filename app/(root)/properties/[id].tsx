import { View, Text, SafeAreaView, ScrollView, Image, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Carousel from 'react-native-reanimated-carousel';
import { getPropertyById } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppWrite';
import images from '@/constants/images';


const Property = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const {data: property} = useAppwrite({fn: getPropertyById, params: {id: id!},});
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 bg-white">
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default Property;