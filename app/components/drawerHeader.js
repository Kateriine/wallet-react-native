import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, TouchableHighlight, Image, Text } from 'react-native';
import Colors from './../config/colors'
import ResetNavigation from './../util/resetNavigation'

export default class DrawerHeader extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      userInfo: {},
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('user').then((value) => {
      this.setState({ 'userInfo': JSON.parse(value) || {} });
    })
  }

  render() {
    //this.getUserInfo()
    return (
      <View style={styles.row}>
        <TouchableHighlight
          underlayColor={'white'}
          style={styles.button}
          onPress={() => ResetNavigation.dispatchUnderDrawer(this.props.navigation, "Settings", 'SettingsPersonalDetails')}>
          {this.state.userInfo.profile ?
            <Image
              style={styles.stretch}
              source={{ uri: this.state.userInfo.profile }}
            /> :
            <Image
              source={require('./../../assets/icons/profile_1.png')}
              style={styles.stretch}
            />
          }
        </TouchableHighlight>
        <View style={styles.col}>
          <Text style={styles.nameText}>
            {(this.state.userInfo.first_name || '') + ' ' + (this.state.userInfo.last_name || '')}
          </Text>
          <Text style={styles.emailText}>
            {this.state.userInfo.email || ''}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 55,
    marginLeft: 15,
    //marginBottom: 15,
  },
  col: {
    flexDirection: "column",
    marginLeft: 15,
  },
  stretch: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  nameText: {
    color: Colors.drawerHeaderText,
    fontSize: 16,
    marginTop: 10,
    fontWeight: "500",
  },
  emailText: {
    color: Colors.drawerHeaderText,
    fontSize: 11,
    marginTop: 10,
  },
});
