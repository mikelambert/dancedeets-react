/**
 * Copyright 2016 DanceDeets.
 *
 * @flow
 */

'use strict';

import React, { NavigationExperimental, StyleSheet, PropTypes } from 'react-native';
import { connect } from 'react-redux';

// My overrides
import NavigationHeaderTitle from '../react-navigation';

import EventListContainer from '../EventListContainer';
import { navigatePush, navigatePop } from '../actions';

import type { ThunkAction, PromiseAction, Dispatch } from '../actions/types';
import type { NavigationParentState, NavigationState } from 'NavigationTypeDefinition';

const {
	AnimatedView: NavigationAnimatedView,
	Card: NavigationCard,
	Header: NavigationHeader
} = NavigationExperimental;

class AppContainer extends React.Component {
	props: {
		navigationState: NavigationParentState,
		onNavigate: (x: NavigationState) => ThunkAction,
		onBack: () => ThunkAction,
	};

	constructor(props) {
		super(props);
		(this: any)._renderScene = this._renderScene.bind(this);
	}

	render() {
		let { navigationState, onBack } = this.props;

		return (

			// Note that we are not using a NavigationRootContainer here because Redux is handling
			// the reduction of our state for us. Instead, we grab the navigationState we have in
			// our Redux store and pass it directly to the <NavigationAnimatedView />.
			<NavigationAnimatedView
				navigationState={navigationState}
				style={styles.outerContainer}
				onNavigate={(action) => {
					if (action.type === 'back' || action.type === 'BackAction') {
						onBack();
					}
				}}
				renderOverlay={props => (
					// Also note that we must explicity pass <NavigationHeader /> an onNavigate prop
					// because we are no longer relying on an onNavigate function being available in
					// the context (something NavigationRootContainer would have given us).
					props.scene.index > 0 ? <NavigationHeader
                        {...props}
						renderTitleComponent={(props2) => {
							return <NavigationHeaderTitle>{props2.scene.navigationState.title}</NavigationHeaderTitle>;
						}}
					/> : null
				)}
				renderScene={props => (
					// Again, we pass our navigationState from the Redux store to <NavigationCard />.
					// Finally, we'll render out our scene based on navigationState in _renderScene().
					<NavigationCard
						{...props}
						key={props.scene.navigationState.key}
						renderScene={this._renderScene}
					/>
				)}
			/>
		);
	}

	_renderScene({scene}) {
		const { navigationState } = scene;
		switch (navigationState.key) {
		case 'EventList':
			return <EventListContainer
				onEventSelected={(event)=>this.props.onNavigate({key: 'EventView', title: event.name})}
			/>;
		case 'EventView':
			return null;
		}
	}
}

AppContainer.propTypes = {
	navigationState: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
	onBack: PropTypes.func.isRequired
};

export default connect(
	state => ({
		navigationState: state.navigationState
	}),
	(dispatch: Dispatch) => ({
		onNavigate: (destState) => dispatch(navigatePush(destState)),
		onBack: () => dispatch(navigatePop())
	}),
)(AppContainer);


const styles = StyleSheet.create({
	outerContainer: {
		flex: 1
	},
	container: {
		flex: 1
	}
});