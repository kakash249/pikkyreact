import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  StatusBar,
  Dimensions
} from "react-native";
import { HomeSliderImageSection } from "../components/HomeSliderImageSection";
import Swiper from "react-native-swiper/src";
const { width, height } = Dimensions.get('window')

const renderPagination = (index, total, context) => {

  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

export default class HomeSliderScreen extends React.Component {
  constructor(props){
    super(props);
    this.onPressNext = this.onPressNext.bind(this);
    this.onPressPrev = this.onPressPrev.bind(this);
    this.state = {
      idxActive: 0
    }
 }

  onPressPrev = () => {
    const {idxActive} = this.state;
    if (idxActive > 0) {
      this.refs.swiper.scrollBy(-1)
    }
  }

  onPressNext = () => {
    const {idxActive} = this.state;
    // Probably best set as a constant somewhere vs a hardcoded 5
    if (idxActive < 5) {
      this.refs.swiper.scrollBy(1);
    }
  }
  onIndexChanged(index) 
  {
    console.log(index);
  }
  onPressSignup = () => {
   // this.props.navigation.navigate("Swipe");
  }
  render() {
  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Swiper
          style={styles.wrapper}
          loop={true}
          index={0}
          horizontal={true}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(248,212,81,.3)',
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#F8D451',
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          paginationStyle={{
            bottom: 70
          }}
        >
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require('./../assets/home_slider/slider_1.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require('./../assets/home_slider/slider_2.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide}>
            <Image 
              style={styles.image} 
              source={require('./../assets/home_slider/slider_3.png')} 
              resizeMode="contain"
              />
          </View>
        </Swiper>

    <View style={styles.buttoncontainer}>
      <TouchableOpacity
        style={styles.signupbutton}
        onPress={this.onPressSignup}
        >
          <Text> Sign up </Text>
      </TouchableOpacity>
      {/* <Button
        onPress={this.onPressNext}
        title="next">
      </Button> */}
    </View>
  </View>
  )}
}

HomeSliderScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
},
buttoncontainer:{
    flex: 0.1,
    alignItems:"center",
    bottom: 40,
},

image: {
  width:width,
  height: height-50
},
signupbutton :{
  alignItems:"center",
  backgroundColor: '#F8D451',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderTopLeftRadius: 15, 
  borderTopRightRadius: 15,
  borderBottomLeftRadius:15, 
  borderBottomRightRadius: 0
}
});