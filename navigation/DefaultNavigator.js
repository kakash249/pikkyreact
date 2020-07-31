// This is our main navigation i have simply provided stack navigation example. You can add what ever requirement you have here
import {
    // createStackNavigator,
    createAppContainer,
  } from "react-navigation";
  import { createStackNavigator } from "react-navigation-stack";

  import HomeScreen from '../screens/HomeScreen';
  import HomeSliderScreen from '../screens/HomeSliderScreen';
  import SwipeUpScreen from '../screens/SwipeUpScreen';

  const defaultNav = {
    header: null
  };

  const Config = {
    navigation: {
      HomeSlider: {
        screen: HomeSliderScreen
      },
      Home: {
        screen: HomeScreen
      },
      Swipe: {
        screen: SwipeUpScreen
      }
    }
  }

  const homeStackNav  = createStackNavigator(Config.navigation,{
    defaultNavigationOptions: defaultNav
  })

  export default createAppContainer(homeStackNav);