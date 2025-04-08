import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons';

const sign_in = () => {

  // function to deal with clicking sign in button
  const handleLogin = () => {}

  return (

  // use <SafeAreaView> to wrap text within viewable range regardless of screen size
  <SafeAreaView className='bg-white flex-1'> 
    {/* used flex-1 to make the view take up the full height of the screen */}
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    {/* padded image at the top */}
    <View style={{ paddingTop: 10 }}>
    <Image source={images.onboarding} className="w-full" style={{ width: '100%', height: "72%" }} resizeMode="contain"/>
      <View className='px-10'>
        <Text className='font-rubik text-base text-center uppercase text-black-200'> Welcome To Homely </Text>
        <Text className='font-rubik-Bold text-3xl text-center mt-2 text-black-300'> Getting you closer to 
          {/* starting text on a new line by wrapping */}
          <Text className='text-primary-300'> your ideal home </Text>
        </Text>
        {/* sign in button */}
        <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 border border-zinc-100 active:bg-zinc-100 '>
          {/* Center and format text and image on button */}
          <View className='flex flex-row items-center justify-center'>
            {/* Add a image of google logo and text on button */}
            <Image source={icons.google} className='w-5 h-5' resizeMode='contain'/>
            <Text className='text-lg font-rubik-Medium ml-2 text-black-300'> Continue with Google </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default sign_in