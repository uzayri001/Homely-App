import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React, { useEffect } from 'react'
import icons from '@/constants/icons';
import images from '@/constants/images';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';
import { router } from 'expo-router';

// SettingsItemProps is an interface that defines the props for the SettingsItem component
interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

// SettingsItem is a component that displays a settings item with an icon, title, and optional arrow
const SettingsItem = ({ icon, title, onPress, textStyle, showArrow=true}: SettingsItemProps) => {
  return (
    <TouchableOpacity className='flex flex-row items-center justify-between py-3' onPress={onPress}>
      <View className='flex flex-row items-center gap-3'>
        <Image source={icon} className='size-6' />
        <Text className={`text-lg font-rubik-Medium text-black-300 ${textStyle}`}>{title}</Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className='size-5' />}
    </TouchableOpacity>
  )
}

// Profile is a component that displays the profile page
const profile = () => {
  const {user, refetch} = useGlobalContext();

  useEffect(() => {
    refetch();
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if(result) {
      Alert.alert('Success', 'Logged out successfully');
      refetch();
      router.replace('/sign_in');
    }
    else {
      Alert.alert('Error', 'Failed to logout');
    }
  };


  return (
    // SafeAreaView is used to avoid the notch on the top of the screen
    <SafeAreaView className="bg-white h-full" >
      {/* ScrollView is used to scroll the content. showsVerticalScrollIndicator={false} hides the scrollbar that would normally appear on the right side when scrolling */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>

        {/* Header row with title and bell icon */}
        <View className='flex-row justify-between items-center mt-5'>
          {/* Title in top left */} 
          <Text className='text-xl font-rubik-Bold'>Profile</Text>
          {/* Bell icon in top right */}
          <Image source={icons.bell} className='size-5' />
        </View>

        {/* Avatar in center under the title */}
        <View className='flex-row justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={{uri: user?.avatar}} className='size-44 relative rounded-full' />
            {/* Edit button on the profile picture and name underneath */}
            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image source={icons.edit} className='size-9' />
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-Bold mt-2'>{user?.name}</Text>
          </View>
        </View>

        {/* Display the settings items as a list under the avatar */}
        <View>
          <SettingsItem icon={icons.calendar} title=" My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        {/* Seperate out other settings */}
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          {settings.slice(2).map((item, index) => {
            return (
              <SettingsItem key={index} {...item} />
            );
          })}
        </View>
        {/* Logout button */}
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          <SettingsItem icon={icons.logout} title="Logout" showArrow={false} onPress={handleLogout}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile