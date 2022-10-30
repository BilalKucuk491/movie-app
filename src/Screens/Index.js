import {Text, View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Data from '../Data/Movies.json';
import NotificationData from '../Data/Notification.json';
import Icon from 'react-native-vector-icons/Ionicons';
import Film from '../Components/Film';
import Notification from '../Components/Notification';


const Index = () => {

  const renderItem = ({item}) => {
    return <Film item={item} />;
  };

  
  const renderNotification = ({item})=>{
    return <Notification item = {item}/>
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.header_title}>MOVIES</Text>
        <Icon name="search" size={15} color="black" />
      </View>
      <View style={styles.body}>
      <View style={{paddingHorizontal:10,marginBottom:20}}>
      <FlatList
          data={NotificationData}
          renderItem={renderNotification}
          showsHorizontalScrollIndicator={false}
          horizontal={true}  
        />
      </View>
      

        <View style={{marginHorizontal:20}}>
          <Text style={styles.body_title}>FILMS</Text>
        </View>
        <View style={{flex: 1,marginHorizontal:10}}>
        <FlatList
          data={Data}
          numColumns={2}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  header_title: {
    fontSize: 20,
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  body_title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
});

export default Index;
