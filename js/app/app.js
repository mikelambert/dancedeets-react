/**
 * Copyright 2016 DanceDeets.
 *
 * @providesModule App
 * @flow
 */

'use strict';

import React, {
  AppState,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LoginFlow from '../login/LoginFlow';
import AppContainer from '../containers/AppContainer';
// import CodePush from 'react-native-code-push';
import { connect } from 'react-redux';


function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    (this: any).handleAppStateChange = this.handleAppStateChange.bind(this);
    (this: any).componentDidMount = this.componentDidMount.bind(this);
  }

  loadAppData() {
    // TODO: Download any app-wide data we need, here.
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.loadAppData();
    // TODO: Enable CodePush at some point before launch
    // CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      this.loadAppData();
      // CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
    }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <LoginFlow />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <AppContainer />
      </View>
    );
  }
  // Add <PushNotificationsController /> back in to <View>...
}
export default connect(select)(App);

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});