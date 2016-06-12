/**
 * Copyright 2016 DanceDeets.
 *
 * @flow
 */

'use strict';

var { purpleColors } = require('../Colors');
var Image = require('Image');
var LinearGradient = require('react-native-linear-gradient');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('./DDText');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');

class Button extends React.Component {
  props: {
    type: 'primary' | 'secondary' | 'bordered';
    icon: ?number;
    caption: string;
    style: any;
    onPress: () => void;
    size: 'small' | 'large';
    textStyle: any;
  };

  static defaultProps = {
    caption: '',
    icon: null,
    style: {},
    onPress: () => {},
    type: 'primary',
    size: 'large',
    textStyle: {},
  };

  render() {
    const caption = this.props.caption;
    let icon;
    if (this.props.icon) {
      icon = <Image source={this.props.icon} style={caption ? styles.iconSpacing : {}} />;
    }
    let content;
    const size = this.props.size === 'small' ? styles.smallButton : styles.largeButton;
    if (this.props.type === 'primary') {
      content = (
        <LinearGradient
          start={[0, 0]} end={[0, 1]}
          colors={[purpleColors[1], purpleColors[2]]}
          style={[styles.button, size, styles.primaryButton, this.props.style]}>
          {icon}
          <Text style={[styles.caption, styles.primaryCaption, this.props.textStyle]}>
            {caption}
          </Text>
        </LinearGradient>
      );
    } else {
      content = (
        <View style={[styles.button, size, this.props.type === 'bordered' && styles.border, this.props.style]}>
          {icon}
          <Text style={[styles.caption, styles.secondaryCaption]}>
            {caption}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[this.props.style]}>
        {content}
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  largeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  border: {
    borderWidth: 1,
    borderColor: 'white',
  },
  primaryButton: {
    backgroundColor: 'transparent',
  },
  iconSpacing: {
    marginRight: 10,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 16,
  },
  primaryCaption: {
    color: 'white',
  },
  secondaryCaption: {
    color: 'white',
  }
});

module.exports = Button;
