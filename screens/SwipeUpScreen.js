import React, { Component } from "react";
import Swiper from "react-native-deck-swiper";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { Platform } from "react-native";

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export default class SwipeUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [...range(1, 1)],
      swipedAllCards: false,
      swipeDirection: "",
      cardIndex: 0,
    };
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Image
          source={require("../assets/swipe/caesarsalad.png")}
          style={styles.backswipeImage}
        />
      </View>
    );
  };

  onSwiped = (type) => {
    console.log(`on swiped ${type}`);
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    });
  };

  swipeLeft = () => {
    this.swiper.swipeLeft();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.middleContainer}>
            <View style={styles.TopContainer}>
              <Image
                source={require("../assets/logo/fdf.png")}
                //style={styles.backArrowImage}
              />
              <Text
                style={styles.usernameText}
              >{`What are your favourite\ncuisines?`}</Text>
              <Text>{`Eg. Italian, Indian, Mexican`}</Text>
            </View>
            </View>
            <View style={styles.swipeContainer}>
              <Swiper
                ref={(swiper) => {
                  this.swiper = swiper;
                }}
                containerStyle={styles.wrapperswiper}
                useViewOverflow={Platform.OS === "ios"}
                onSwiped={() => this.onSwiped("general")}
                onSwipedLeft={() => this.onSwiped("left")}
                onSwipedRight={() => this.onSwiped("right")}
                disableBottomSwipe={true}
                disableTopSwipe={true}
                onTapCard={this.swipeLeft}
                cards={this.state.cards}
                cardIndex={this.state.cardIndex}
                cardVerticalMargin={80}
                renderCard={this.renderCard}
                onSwipedAll={this.onSwipedAllCards}
                stackSize={3}
                stackSeparation={15}
                overlayLabels={{
                  bottom: {
                    title: "BLEAH",
                    style: {
                      label: {
                        backgroundColor: "black",
                        borderColor: "black",
                        color: "white",
                        borderWidth: 1,
                      },
                      wrapper: {
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    },
                  },
                  left: {
                    title: "NOPE",
                    style: {
                      label: {
                        backgroundColor: "black",
                        borderColor: "black",
                        color: "white",
                        borderWidth: 1,
                      },
                      wrapper: {
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        marginTop: 30,
                        marginLeft: -30,
                      },
                    },
                  },
                  right: {
                    title: "LIKE",
                    style: {
                      label: {
                        backgroundColor: "black",
                        borderColor: "black",
                        color: "white",
                        borderWidth: 1,
                      },
                      wrapper: {
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        marginTop: 30,
                        marginLeft: 30,
                      },
                    },
                  },
                  top: {
                    title: "SUPER LIKE",
                    style: {
                      label: {
                        backgroundColor: "black",
                        borderColor: "black",
                        color: "white",
                        borderWidth: 1,
                      },
                      wrapper: {
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    },
                  },
                }}
                animateOverlayLabelsOpacity
                animateCardOpacity
                swipeBackCard
              ></Swiper>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    position: "relative",
    //paddingLeft: 50,
    //paddingRight: 50,
    paddingTop: 40,
    paddingBottom: 40,
    height: "100%",
    width: "100%",
  },
  topContainer: {
    height: 40,
  },
  middleContainer: {
    height: 250,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop:20
  },
  swipeContainer: {
    flex: 1,
    backgroundColor:"transparent",
    paddingTop:0,
    marginTop:0
  },
  wrapperswiper: {
    backgroundColor:"#ffffff",
    paddingTop:0,
    top:0
  },
  usernameText: {
    fontSize: 24,
    textAlign: "left",
    marginTop: 30,
    width: "75%",
    height:100
  },
  card: {
    flex: 0.7,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },
  backswipeImage :{
    width:'100%',
    height:'100%',
    right:0
  }
});
