import { Text, SafeAreaView, ScrollView, View, Image, TouchableOpacity, FlatList, Button } from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { FeaturedCards, Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";

export default function Index() {

const user = useGlobalContext();

  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      {/* Using contentContainerStyle to prevent content from being cut off at the bottom */}
      <FlatList 
        data={[1,2, 3, 4]}
        renderItem={({item}) => <Card onPress={() => {}} />}
        contentContainerClassName="pb-32"
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        columnWrapperClassName="flex gap-5"
        showsVerticalScrollIndicator={false}
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
            <FlatList data={[5,6,7]} 
              renderItem={({item}) => <FeaturedCards onPress={() => {}}/>} 
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5 mt-5"
              bounces={false}
            />
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
