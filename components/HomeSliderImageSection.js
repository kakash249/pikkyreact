import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground
} from "react-native";

export function HomeSliderImageSection(props) {
  const navigation = React.us
  // var state = true;
  // const changeState = () => {
  //   state = !state;
  //   props.navigation.navigate('Signup');
  // }
  const getText = () => {
    let screenNumber = props.screenNumber;
    switch (screenNumber) {
      case 0:
        return `Explore recipes from\naround the world`;
        break;
      case 1:
        return `Know your flavour & eat\nyour heart out.`;
        break;
      case 2:
        return `Create a flavourful food\nprofile.`;
        break;
      case 3:
        return `Let us get started with an\naccount.`;
        break;

      default:
        break;
    }
  };
  const getImage = () => {
    let screenNumber = props.screenNumber;
    switch (screenNumber) {
      case 0:
        return require("../assets/home_slider/slider_1.png");
        break;
      case 1:
        return require("../assets/home_slider/slider_2.png");
        break;
      case 2:
        return require("../assets/home_slider/slider_3.png");
        break;
      case 3:
        return require("../assets/home_slider/slider_4.png");
        break;

      default:
        break;
    }
  };
  // const getImageBg = () =>{
  //   switch (state) {
  //     case true:
  //       return require("../assets/images/home_slider/home_slider_button_1.png");
  //       break;
  //     case false:
  //       return require("../assets/images/home_slider/home_slider_button_1dd.png");
  //       break;

  //     default:
  //       break;
  //   }
  // }
  return (
    <View style={styles.homeSlidercontainer}>
      <View style={styles.topImageContainer}>
        <Image
          source={getImage()}
          style={styles.firstImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bigFontSize}>
          {getText()}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            underlayColor="#fff"
            onPress={() => {
              props.navigation.navigate('Signup');
            }}
          >
            <ImageBackground
              source={ require("../assets/home_slider/home_slider_button_1.png") }
              style={styles.signUpButtonBackground}
              resizeMode="cover"
            >
              <View style={styles.signupButton}>
                <Text style={styles.signupText}>SIGN UP</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            //onPress={() => navigate('HomeScreen')}
            underlayColor="#fff"
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeSlidercontainer: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%"
  },
  topImageContainer: {
    flex: 4,
    justifyContent:'space-between',
    flexDirection:"row",
    marginBottom: 40,
    width: "100%"
  },
  textContainer: {
    flex: 0.8
  },
  buttonContainer: {
    flex: 1,
  },
  firstImage: {
    resizeMode: "contain",
    width:'100%',
    marginTop: 80,
    //marginLeft: -10,
    borderColor: "#DDD",
    // borderRadius: 2,
    // borderWidth: 4,
    // padding: 30
  },
  bigFontSize: {
    fontSize: 22,
    textAlign: "center"
  },
  signUpButtonBackground: {
    width: 150,
    height: 45,
  },
  signupButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  signupText:{
    color: "#ffffff",
    fontWeight: "bold"
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
    fontWeight: "800",
    marginTop:20,
    alignItems: "center",
  },
});
