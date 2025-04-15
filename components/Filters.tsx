import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { categories } from '@/constants/data';
import { router } from 'expo-router';

const Filters = () => {
  const params = useLocalSearchParams<{filter?:string}>();
  const [selectedFilter, setSelectedFilter] = useState(params.filter || 'All');

  const handleFilter = (category: string) => {
    if (selectedFilter === category) {
        setSelectedFilter('All');
        router.setParams({filter: 'All'});
        return;
    }
    setSelectedFilter(category);
    router.setParams({filter: category});
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
      {categories.map((item, index) => (
        <TouchableOpacity className={"flex flex-col items-start px-4 py-2 rounded-full mr-4" + 
        (selectedFilter === item.category ? ' bg-primary-300' : ' bg-primary-100 border border-primary-300')}
        onPress={() => handleFilter(item.category)}>
            <Text className={`text-sm 
                ${selectedFilter === item.category ? 'text-white font-rubik-Bold mt-0.5' : 'text-black-300 font-rubik'}`}> 
                {item.title} 
            </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default Filters