import React, { useEffect, useLayoutEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useSelector } from 'react-redux'
import { DashboardScreenProps } from '../../@types/navigation'
import {
	Button,
	Icon,
	Text,
	Screen,
	Wallpaper,
	Image,
	Spacer,
	Container,
	ScreenWrapper,
	Header,
	Card,
} from '../../components'
import socket from '../../services/sockets'
import { RootState } from '../../store'
import { colors, spacing } from '../../theme'
import { MimirLogo } from './dashboard-screen.styled'

const logoMimir = require('../../../assets/images/mimir.png')
const logoMimir2 = require('../../../assets/images/mimir_3.png')
const wallet = require('../../../assets/images/mimir_wallet.png')
//
// const FULL: ViewStyle = { flex: 1 }
// const CONTAINER: ViewStyle = {
// 	backgroundColor: colors.transparent.transparent,
// 	paddingHorizontal: spacing.medium,
// }
// const DEMO: ViewStyle = {
// 	paddingVertical: spacing.medium,
// 	paddingHorizontal: spacing.medium,
// 	backgroundColor: colors.palette.deepPurple,
// }
// const FREE: ViewStyle = {
// 	borderRadius: 50,
// 	paddingVertical: spacing.medium,
// 	paddingHorizontal: spacing.medium,
// 	backgroundColor: '#78305F',
// }
// const BET: ViewStyle = {
// 	borderRadius: 50,
// 	paddingVertical: spacing.medium,
// 	paddingHorizontal: spacing.medium,
// 	backgroundColor: '#0EF3C5',
// }
// const BOLD: TextStyle = { fontWeight: 'bold' }
// const DEMO_TEXT: TextStyle = {
// 	...BOLD,
// 	fontSize: 13,
// 	letterSpacing: 2,
// }
// const HEADER: TextStyle = {
// 	paddingTop: spacing.medium,
// 	paddingBottom: spacing.medium,
// 	paddingHorizontal: 0,
// }
// const HEADER_TITLE: TextStyle = {
// 	...BOLD,
// 	fontSize: 12,
// 	lineHeight: 15,
// 	textAlign: 'center',
// 	letterSpacing: 1.5,
// }
// const TITLE: TextStyle = {
// 	...BOLD,
// 	fontSize: 28,
// 	lineHeight: 38,
// 	textAlign: 'center',
// 	marginBottom: spacing.medium,
// 	marginTop: spacing.medium,
// }
// const TAGLINE: TextStyle = {
// 	color: '#BAB6C8',
// 	fontSize: 15,
// 	lineHeight: 22,
// 	marginBottom: spacing.medium,
// }
// const MIMIR: ImageStyle = {
// 	alignSelf: 'center',
// 	width: 120,
// 	height: 100,
// }
//
// const WALLET: ImageStyle = {
// 	alignSelf: 'center',
// 	width: 30,
// 	height: 30,
// 	marginVertical: 0,
// }
//
// const TOKEN: ImageStyle = {
// 	alignSelf: 'center',
// 	width: 18,
// 	height: 26,
// 	marginRight: 10,
// }
//
// const LOVE_WRAPPER: ViewStyle = {
// 	flexDirection: 'row',
// 	alignItems: 'center',
// 	alignSelf: 'center',
// }
// const LOVE: TextStyle = {
// 	color: '#BAB6C8',
// 	fontSize: 15,
// 	lineHeight: 22,
// }
// const HEART: ImageStyle = {
// 	marginHorizontal: spacing.small,
// 	width: 10,
// 	height: 10,
// 	resizeMode: 'contain',
// }
// const HINT: TextStyle = {
// 	color: '#BAB6C8',
// 	fontSize: 12,
// 	lineHeight: 15,
// 	marginVertical: spacing.small,
// }
// const POT: ViewStyle = {
// 	flexDirection: 'row',
// 	justifyContent: 'space-evenly',
// 	marginTop: spacing.massive,
// 	marginHorizontal: spacing.medium,
// 	paddingVertical: spacing.smaller,
// 	backgroundColor: colors.palette.white,
// }
// const TEXT: TextStyle = {
// 	color: colors.palette.white,
// }
// const POT_TEXT: TextStyle = {
// 	...TEXT,
// 	...BOLD,
// 	color: colors.palette.deepPurple,
// 	fontSize: 13,
// 	letterSpacing: 2,
// }
// const BALANCE_TEXT: TextStyle = {
// 	...TEXT,
// 	...BOLD,
// 	color: colors.palette.deepPurple,
// 	fontSize: 30,
// }

export const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
	const [balance, setBalance] = useState('')
	const [games, setGames] = useState([])
	const goBack = () => navigation.goBack()
	const { username } = useSelector((state: RootState) => state.user)

	useFocusEffect(() => {
		console.log('CHECKING WALLET BALLANCE')
		// socket.emit('getGames')
		checkWalletBalance()
	})

	useEffect(() => {
		console.log('CHECKING WALLET BALLANCE')
		socket.emit('getGames')
	}, [])

	socket.on('openGames', games => {
		console.log(games)
		setGames(games)
	})

	const checkWalletBalance = async () => {
		try {
			const currentBalance = await AsyncStorage.getItem('balance')
			if (!currentBalance) {
				await AsyncStorage.setItem('balance', '3570')
				setBalance('3570')
			} else {
				setBalance(currentBalance)
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<ScreenWrapper testID="DashboardScreen" safeAreaView>
			<Wallpaper />
			<Header leftIcon={'switch'} rightIcon={'cog'} />
			<Screen backgroundColor={colors.transparent.transparent} unsafe>
				<Container centerHorizontal>
					<MimirLogo source={logoMimir} />
					<Spacer space={'medium'} />
					<Text variant={'white'} typography={'h1'} text={username} />
				</Container>
				<Container centerHorizontal centerVertical>
					<Button variant={'secondary'} text={'FREE TO PLAY'} typography={'h2'} />
				</Container>
				{/*<Container>*/}
				{/*	/!*{games.map(game => {*!/*/}
				{/*	/!*	const nextRoute = game.type === 'FREE' ? 'bet' : 'game'*!/*/}
				{/*	/!*	return (*!/*/}
				{/*	/!*		<View key={game.refId}>*!/*/}
				{/*	/!*			<AnimatedCircularProgress*!/*/}
				{/*	/!*				size={150}*!/*/}
				{/*	/!*				width={15}*!/*/}
				{/*	/!*				backgroundWidth={15}*!/*/}
				{/*	/!*				rotation={360}*!/*/}
				{/*	/!*				fill={85}*!/*/}
				{/*	/!*				tintColor="#78305F"*!/*/}
				{/*	/!*				backgroundColor="#fff">*!/*/}
				{/*	/!*				{fill => <Text style={styles.points}>20:00</Text>}*!/*/}
				{/*	/!*			</AnimatedCircularProgress>*!/*/}
				{/*	/!*			<Text style={styles.actionLabel}>{game.type} TO PLAY</Text>*!/*/}
				{/*	/!*			<Button*!/*/}
				{/*	/!*				style={FREE}*!/*/}
				{/*	/!*				textStyle={DEMO_TEXT}*!/*/}
				{/*	/!*				text="JOIN"*!/*/}
				{/*	/!*				onPress={() => navigation.navigate(nextRoute, { gameId: game.refId })}*!/*/}
				{/*	/!*			/>*!/*/}
				{/*	/!*		</View>*!/*/}
				{/*	/!*	)*!/*/}
				{/*	/!*})}*!/*/}

				{/*	/!* <View>*/}
				{/*		<AnimatedCircularProgress*/}
				{/*			size={150}*/}
				{/*			width={15}*/}
				{/*			rotation={360}*/}
				{/*			backgroundWidth={15}*/}
				{/*			fill={75}*/}
				{/*			tintColor="#0EF3C5"*/}
				{/*			backgroundColor="#fff">*/}
				{/*			{fill => <Text style={styles.points}>21:00</Text>}*/}
				{/*		</AnimatedCircularProgress>*/}
				{/*		<Text style={styles.actionLabel}>BET TO PLAY</Text>*/}
				{/*		<Button style={BET} textStyle={DEMO_TEXT} text="JOIN" onPress={() => navigation.navigate('game')} />*/}
				{/*	</View> *!/*/}
				{/*</Container>*/}
				<Container>
					<Card
						style={{
							flex: 1,
							minHeight: 120,
							justifyContent: 'center',
							marginLeft: 10,
							backgroundColor: '#372644',
							shadowColor: 'black',
							alignItems: 'center',
							shadowOffset: { width: 3, height: 8 },
							shadowOpacity: 0.2,
							shadowRadius: 3.84,
							borderRadius: 10,
							elevation: 8,
						}}>
						<Icon color={'white'} name={'mimir_wallet'} />
						<Spacer space={'small'} />
						<Text text={balance} typography={'h1'} />
					</Card>
					<Spacer space={'small'} />

					<Card
						style={{
							flex: 1,
							justifyContent: 'center',
							minHeight: 120,
							marginLeft: 10,
							backgroundColor: '#372644',
							shadowColor: 'black',
							alignItems: 'center',
							shadowOffset: { width: 3, height: 8 },
							shadowOpacity: 0.2,
							shadowRadius: 3.84,
							borderRadius: 10,
							elevation: 8,
						}}>
						<Icon color={'white'} name={'mimir_wallet'} />
						<Spacer space={'small'} />
						<Text text={'Leaderboards'} typography={'h1'} />
					</Card>
				</Container>
				<Spacer space={'huge'} />
			</Screen>
		</ScreenWrapper>
	)
}

const styles = StyleSheet.create({
	actionLabel: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '500',
		marginBottom: 30,
		marginTop: 30,
		textAlign: 'center',
	},
	container: {
		alignItems: 'center',
		backgroundColor: '#152d44',
		flex: 1,
		justifyContent: 'space-between',
		padding: 50,
	},
	points: {
		color: '#ffffff',
		fontSize: 25,
		fontWeight: '500',
		letterSpacing: 1.5,
		textAlign: 'center',
	},
	pointsDelta: {
		color: '#4c6479',
		fontSize: 50,
		fontWeight: '100',
	},
	pointsDeltaActive: {
		color: '#fff',
	},
})
