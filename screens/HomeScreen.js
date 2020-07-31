import React, { useRef } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import {GiftedChat, Actions, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import * as Animatable from 'react-native-animatable';
import CustomActions from '../components/CustomActions';
import CustomView from '../components/CustomView';
import { IconButton } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      showtoolbar: 'none',
      currentMessage : []
    };
    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.customtInputToolbar = this.customtInputToolbar.bind(this);
    this.onQuickReply = this.onQuickReply.bind(this);
    this.onCloseBottomSheet = this.onCloseBottomSheet.bind(this);

    this._isAlright = null;
    this.bounceInLeft = {
      0: {
        opacity: 0,
        scale: 0.9,
      },
      1: {
        opacity: 1,
        scale: 1,
      }
    };
  }

  componentWillMount() {
    this._isMounted = true;
    var scope = this;
    var messages = require('./../data/messages.js');
    messages.forEach(function(data, index){
      setTimeout(function(){
        scope.state.showtoolbar = data.optionType;
        scope.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, data)
          };
        });
      },
      1000 * index);
  })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
  });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./../data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    delete messages[0].createdAt;
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });

    // for demo purpose
    console.log("Im here atle");
    this.answerDemo(messages);
  }
  onQuickReply(messages)
  {
    this.RBSheet.open();
    this.state.currentMessage = messages;
  }
  onCloseBottomSheet(props)
  {
    this.onSendResponse(this.state.currentMessage[0].title)
    this.answerDemo(this.state.currentMessage);
  }
  answerDemo(messages) {
    console.log("im here m");
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }
      console.log(this.state.showtoolbar);
      if (this._isMounted === true) {
        console.log(messages);
        if (messages.length > 0) {
            switch (this.state.showtoolbar) {

              case 'phone' :
                this.state.showtoolbar = 'none';
                setTimeout(() => {
                  this.state.showtoolbar = 'otp';
                  this.onReceive('Enter Otp you recieved on your phone');
                }, 1000);
                break;
              case 'otp' :
                this.state.showtoolbar = 'none';
                setTimeout(() => {
                this.state.showtoolbar = 'foodchoice';
                this.onReceive('Awesome, you\'re number has been verified');
              }, 1000);
                setTimeout(() => {
                  this.onFoodReply();
                }, 2000);
                break;
              case 'foodchoice':
                this.state.showtoolbar = 'none';
                setTimeout(() => {
                  this.state.showtoolbar = 'foodselection';
                },1000)
                setTimeout(() => {
                  this.onFoodSelection();
                }, 1000);
                break;
              case 'foodselection':
                this.state.showtoolbar = 'none';
                setTimeout(() => {
                  this.state.showtoolbar = 'none'
                  this.onReceive('Awesome, Let\'s swipe out few food option');
                  },1000)
                break;
              default :
                if(this.state.showtoolbar == 'none')
                {
                  this.onReceive('Hi, Akash How are you');
                }
                break;
            }
        }
      }
      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          user: {
            _id: 2
          },
        }),
      };
    });
  }

  onSendResponse(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          user: {
            _id: 1
          },
        }),
      };
    });
  }


  onFoodReply() {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: 'Select Your food preferences',
          user: {
            _id: 2
          },
          quickReplies: {
            type: 'radio', // or 'checkbox',
            keepIt: false,
            values: [
              {
                title: 'Vegeterian',
                value: 'yes',
              },
              {
                title: 'Non Vegeterian',
                value: 'yes_picture',
              },
              {
                title: 'Eggeterian',
                value: 'no',
              },
              {
                title: 'Vegan',
                value: 'no',
              },
            ]
          },
        }),
      };
    });
  }

  onFoodSelection() {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: 'Select some of your food options',
          user: {
            _id: 2
          },
          quickReplies: {
            type: 'radio', // or 'checkbox',
            keepIt: false,
            values: [
              {
                title: 'Vegeterian',
                value: 'yes',
              }
            ]
          },
        }),
      };
    });
  }


  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    if(props.currentMessage.image)
    {
      return (
        <Animatable.View animation={this.bounceInLeft} duration={400}>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              paddingTop:40,
              paddingLeft: 0,
              marginBottom: 8,
              marginLeft:-25,
              aspectRatio: 1,
              backgroundColor: 'transparent',
            }
          }}
          imageStyle={{
            height:120
          }}
        />
        </Animatable.View>
      );
    }
    if(props.currentMessage.text)
    {
      return (
        <Animatable.View animation={this.bounceInLeft} duration={400}>
        <Bubble
          textStyle={{
            left: {
              color: '#333',
            },
            right: {
              color: '#333',
              textAlign:'right'
            }
          }}
          wrapperStyle={{
            left: {
              backgroundColor: '#ffffff',
              borderWidth: 1,
              borderColor: '#dedede',
              padding: 8,
              borderTopLeftRadius: 15, 
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 0, 
              borderBottomRightRadius: 15,
              paddingLeft: 0,
              marginBottom: 8,
              maxWidth: 300
            },
            right: {
              backgroundColor: '#ffffff',
              borderWidth: 1,
              padding: 8,
              borderColor: '#dedede',
              borderTopLeftRadius: 15, 
              borderTopRightRadius: 15,
              borderBottomLeftRadius:15, 
              borderBottomRightRadius: 0
            }
          }}
          linkStyle={{
            left: {
              color: '#333',
            },
            right: {
              color: '#333',
              textAlign:'right'
            }
          }}
          {...props}
        />
        </Animatable.View>
      );
    }
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }
  setavatar(props)
  {
    return null
  }
  setPlaceholder()
  {
    switch (this.state.showtoolbar) {
      case 'phone':
        return "Enter Phone Number"

      case 'otp':
        return "Enter Otp"

      default:
        return "Type Anything"
    }
  }
  customtInputToolbar(props)
  {

    switch (this.state.showtoolbar) {
      case 'phone':
        return (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: "white",
              borderColor: "#E8E8E8",
              borderWidth: 1,
              paddingTop:6,
              paddingBottom: 4,
              width:'90%',
              height:50,
              justifyContent:'center',
              marginLeft:'5%',
              marginRight:'5%',
              marginBottom: 15,
              borderTopLeftRadius: 8, 
              borderTopRightRadius: 8,
              borderBottomLeftRadius:8, 
              borderBottomRightRadius: 8
            }}
          />
        );
        break;
      case 'otp' :
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: "white",
                borderColor: "#E8E8E8",
                borderWidth: 1,
                paddingTop:6,
                paddingBottom: 4,
                width:'90%',
                height:50,
                justifyContent:'center',
                marginLeft:'5%',
                marginRight:'5%',
                marginBottom: 15,
                borderTopLeftRadius: 8, 
                borderTopRightRadius: 8,
                borderBottomLeftRadius:8, 
                borderBottomRightRadius: 8
              }}
            />
          );
        break;
      case 'foodchoice' :
        return null
        break;
      default:
        return null
        break;
    }
  }
  renderSend(props) {
    return (
      <Send {...props}
      containerStyle={{
        borderWidth: 0,
        marginTop:0
      }}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={36} color='#f1cb1d' style={styles.sendbtn}/>
        </View>
      </Send>
    );
  }
  render() {
    return (
      <View style={{ backgroundColor: "#F2F2F2", flex:1 }}>

                <View>
                    <RBSheet
                      ref={ref => {
                        this.RBSheet = ref;
                      }}
                      animationType = "none"
                      height={300}
                      onClose={this.onCloseBottomSheet}
                      closeOnDragDown={true}
                      closeOnPressMask={false}
                      customStyles={{
                        container: {
                          justifyContent: "center",
                          alignItems: "center"
                        }
                      }}
                    >
                      <Text>Paneer</Text>
                      <Text>Milk</Text>
                      <Text>Bread</Text>
                    </RBSheet>
                </View>

                <GiftedChat
                  messages={this.state.messages}
                  onSend={this.onSend}
                  minInputToolbarHeight={60}
                  // loadEarlier={this.state.loadEarlier}
                  // onLoadEarlier={this.onLoadEarlier}
                  // isLoadingEarlier={this.state.isLoadingEarlier}

                  user={{
                    _id: 1, // sent messages should have same user._id
                  }}
                  multiline={false}
                  onQuickReply={this.onQuickReply}
                  placeholder= {this.setPlaceholder()}
                  renderAvatar={this.setavatar}
                  renderBubble={this.renderBubble}
                  renderCustomView={this.renderCustomView}
                  renderFooter={this.renderFooter}
                  renderSend={this.renderSend}
                  renderInputToolbar={this.customtInputToolbar}
                  textInputProps={{autoFocus: true, keyboardType: 'numeric'}}
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  textStyle:{
    color : '#ff0000'
  },
  sendingContainer: {
    width:60,
    height:80,
    borderWidth:0,
    paddingTop:28
  }
});

