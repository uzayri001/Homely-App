import { View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Card, FeaturedCards } from '@/components/Cards'
import NoResults from '@/components/NoResults'
import Filters from '@/components/Filters'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import { useGlobalContext } from '@/lib/global-provider'
import { useAppwrite } from '@/lib/useAppWrite'
import { getLatestProperties, getProperties } from '@/lib/appwrite'
import { router, useLocalSearchParams, useRouter } from 'expo-router'

const explore = () => {

  const params = useLocalSearchParams<{filter?: string; query?: string;}>();
  const {data: properties, loading, refetch} = useAppwrite({fn: getProperties, params: {
    filter: params.filter!, 
    query: params.query!,
    limit: 20 },
    skip: true
  })

  const handlePress = (id: string) => {
    router.push(`/properties/${id}`);
  }

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20
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
            <View className="flex flex-row justify-between items-center mt-5">
              <TouchableOpacity className="flex flex-row items-center gap-2 bg-primary-200 rounded-full size-11 justify-center" onPress={() => router.back()}>
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base mr-2 font-rubik-Medium text-center text-black-300">Search For Your Ideal Home</Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-Bold text-black-300 mt-5"> Found {properties?.length} properties</Text>
            </View>
          </View>
        }
        />
    </SafeAreaView>
  )
}

export default explore