import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Data from '../Data/Movies.json';
import StarFilled from '../Images/star_filled.png';

import Modal from 'react-native-modal';
import Video from 'react-native-video';

const Views = props => {

  const videoRef = useRef(null);
  const [paused,setPaused] = useState(true);
  
  const id = props.route.params.id;
  const item = Data.filter(item => item.id == id)[0];

  const hours = Math.floor(item.duration / 60);
  const minutes = item.duration % 60;
  const duration = `${hours} hrs ${minutes} min`;

  const [isModalVisible, setisModalVisible] = useState(false);

  const Star = ({starData}) => {
    return (
      <View style={style.star_container}>
        <Image
          style={style.star_image}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
          }}
        />
        <Text style={style.star_name}>{starData.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={style.header}>
          <View style={style.controls}>
            <TouchableOpacity 
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="chevron-back-sharp" size={20} color="white" />
              <Text
                style={{
                  marginLeft: 5,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="share-social" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={style.overlay} />
          <Image
            resizeMode="cover"
            source={{uri: item.image}}
            style={style.header_image}
          />

          <View style={style.playButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setisModalVisible(!isModalVisible);
                setPaused(false); 
              }}
              style={style.playButton}>
              <Icon name={paused ? "play-outline" : "pause-outline"} size={25} color="white" />
            </TouchableOpacity>
          </View>

          <View style={style.informationImageContainer}>
            <Image style={style.informationImage} source={{uri: item.image}} />
          </View>
          <View style={style.informationNameContainer}>
            <Text style={style.informationName}>{item.name}</Text>
          </View>
        </View>

        <View style={style.body}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}} />
            <View style={style.top_right}>
              <View style={style.top_right_item}>
                <Icon name="person-sharp" size={20} />
                <Text style={style.top_right_item_text}>{item.director}</Text>
              </View>
              <View style={style.top_right_item}>
                <Icon name="folder-open-sharp" size={20} />
                <Text style={style.top_right_item_text}>{item.category}</Text>
              </View>

              <View style={style.top_right_item}>
                <Icon name="time-outline" size={20} />
                <Text style={style.top_right_item_text}>{duration}</Text>
              </View>

              <View style={style.top_right_item}>
                <Image style={style.starImgStyle} source={StarFilled} />
                <Text style={style.starTextStyle}>{item.rating} / 10</Text>
              </View>
            </View>
          </View>
          <View style={style.content}>
            <Text style={style.content_description}>{item.description}</Text>
            <View style={style.stars}>
              {item.Stars.map(item => (
                <Star starData={item} />
              ))}
            </View>
          </View>
        </View>
            
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={style.modal_container}>
          <View style={style.modal_body}>
            <TouchableOpacity onPress={()=> {
              setisModalVisible(false);
              setPaused(true);
            }} style={style.modalCloseButton}>
              <Icon color="white" size={20} name="close"  />
            </TouchableOpacity>
            <Video ref={videoRef} paused={paused} resizeMode={"cover"} source={{uri: item.video}} style={style.video} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9,
    width: '100%',
    height: '100%',
  },
  header_image: {
    width: '100%',
    height: 300,
  },
  playButtonContainer: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#db3069',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    position: 'absolute',
    zIndex: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    top: 20,
    paddingHorizontal: 20,
  },
  informationImage: {
    width: 120,
    height: 180,
    borderRadius: 5,
  },
  informationImageContainer: {
    zIndex: 11,
    position: 'absolute',
    left: 20,
    bottom: -100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  informationNameContainer: {
    zIndex: 11,
    position: 'absolute',
    bottom: 20,
    right: 25,
    width: 230,
  },
  informationName: {
    fontSize: 17,
    fontWeight: '800',
    color: 'white',
  },
  body: {
    flex: 1,
    padding: 10,
  },
  top_right: {
    flex: 1.75,
    marginHorizontal: 5,
    paddingVertical: 20,
  },
  content: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  content_description: {
    fontSize: 20,
    fontWeight: '500',
    color: '#666',
  },
  top_right_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  top_right_item_text: {
    left: 5,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
  },
  stars: {
    marginTop: 20,
    flexDirection: 'row',
  },
  star_container: {
    flex: 1,
  },
  star_image: {
    width: 120,
    height: 120,
    resizeMode: 'center',
    borderRadius: 5,
  },
  star_name: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImgStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  starTextStyle: {
    fontSize: 20,
    left: 10,
    fontWeight: '500',
    color: 'black',
  },
  modal_body: {
    backgroundColor: 'white',
    height: 300,
    width: '100%',
  },
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton:{
    position:"absolute",
    right:-10,
    top:-15,
    zIndex:999,
    width:35,
    height:35,
    backgroundColor:"black",
    borderRadius:100,
    justifyContent:"center",
    alignItems:"center"
  },
  video:{
    height:300,
    width:"100%",
  }
});

export default Views;
