/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainParamList } from '../@types/navigation'
import {
	WelcomeScreen,
	GameScreen,
	GameLobbyScreen,
	QuestionScreen,
	FinalScreen,
	GameModeScreen,
	DashboardScreen,
} from '../screens'
import { TournamentsScreen } from '../screens/game/tournaments-screen'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<MainParamList>()

export function MainNavigator() {
	return (
		<Stack.Navigator
			initialRouteName={'Dashboard'}
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
			}}>
			<Stack.Screen name="welcome" component={WelcomeScreen} />
			<Stack.Screen name="Dashboard" component={DashboardScreen} />
			<Stack.Screen name="GameMode" component={GameModeScreen} />
			<Stack.Screen name="Tournaments" component={TournamentsScreen} />
			<Stack.Screen name="Game" component={GameScreen} />
			<Stack.Screen name="GameLobby" component={GameLobbyScreen} />
			<Stack.Screen name="question" component={QuestionScreen} />
			<Stack.Screen name="Final" component={FinalScreen} />
		</Stack.Navigator>
	)
}
