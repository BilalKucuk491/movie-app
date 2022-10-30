import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Film = ({item}) => {
  
  const history = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => history.navigate('view', {id: item.id})}
      style={style.container}>
      <View style={style.image_container}>
        <View style={style.rating_container}>
          <Text style={style.rating}>{item.rating}</Text>
        </View>
        <Image style={style.image} source={{uri: item.image}} />
      </View>
      <View style={style.detail_container}>
        <Text style={style.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  image_container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    width: '100%',
    height: 200,
  },
  detail_container: {
    marginTop: 5,
  },
  title: {
    textAlign: 'center',
    fontsize: 14,
    fontWeight: '500',
  },
  rating_container: {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: '#ec712b',
    right: 5,
    top: 5,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Film;
