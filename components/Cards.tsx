import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { Models } from 'react-native-appwrite'

interface Props {
    onPress: () => void
    item: Models.Document
}

export const FeaturedCards = ({ item: {image, rating, name, address, price}, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80 relative">
        {/* When clicked, the onPress prop is called which navigates to the property details page */}
        {/* This can be seen in the index.tsx file where handlePress routes to /properties/[id] */}
        <Image source={{uri: image}} className="size-full rounded-2xl"/>
        <Image source={images.cardGradient} className="size-full rounded-2xl absolute bottom-0"/>
        <View className="flex flex-row items-center gap-1 absolute top-5 right-5 bg-white/90 px-3 py-1.5 rounded-full">
            <Image source={icons.star} className="size-3.5"/>
            <Text className="text-primary-300 ml-1 text-xs font-rubik-Bold">{rating}</Text>
        </View>
        <View className="flex flex-col items-start absolute bottom-5 left-5 inset-x-5">
            <Text className="text-xl font-rubik-ExtraBold text-white" numberOfLines={1}> {name} </Text>
            <Text className="text-base font-rubik text-white" numberOfLines={1}> {address} </Text>
            <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-white text-xl font-rubik-ExtraBold"> $ {price} </Text>
                <Image source={icons.heart} className="size-5"/>
            </View>
        </View>
    </TouchableOpacity>
  )
} 

export const Card = ({ item: {image, rating, name, address, price}, onPress}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-1 items-start w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg 
        shadow-black-100/70 relative">
        <View className="flex flex-row items-center absolute top-5 right-5 bg-white/90 px-2 py-1.5 rounded-full p-1 z-50">
            <Image source={icons.star} className="size-2.5"/>
            <Text className="text-primary-300 ml-0.5 text-xs font-rubik-Bold">{rating}</Text>
        </View>
        <Image source={{uri: image}} className="w-full h-40 rounded-lg"/>
        <View className="flex flex-col mt-2">
            <Text className="text-base font-rubik-Bold text-blac-300"> {name} </Text>
            <Text className="text-xs font-rubik text-black-200"> {address} </Text>
            <View className="flex flex-row items-center justify-between mt-2">
                <Text className="text-base text-primary-300 font-rubik-Bold"> $ {price} </Text>
                <Image source={icons.heart} className="w-5 h-5 mr-2" tintColor="#191d31"/>
            </View>
        </View>
        </TouchableOpacity>
    )
}