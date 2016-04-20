import React from 'react-native';
import { connect } from 'react-redux';
import TutorialScreen from './TutorialScreen';
import { NoLoginScreen } from './NoLoginScreen';
import { loginButtonPressed } from './logic';

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (e) => loginButtonPressed(dispatch),
  };
};

class OnboardingFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'CAROUSEL',
    };
    this._transition = this._transition.bind(this);
  }

  _transition(newState) {
    this.setState({...this.state, screen: newState});
  }

  render() {
    if (this.state.screen === 'CAROUSEL') {
      return <TutorialScreen
        onLogin={this.props.onLogin}
        onNoLogin={() => this._transition('NO_LOGIN')}
      />;
    } else if (this.state.screen === 'NO_LOGIN') {
      return <NoLoginScreen
        onLogin={this.props.onLogin}
        onNoLogin={() => console.log('open website')}
        />;
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(OnboardingFlow);