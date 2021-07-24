import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet, Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Button, Text, Screen, Wallpaper, AutoImage as Image, Header } from '../../components'
import socket from '../../services/sockets'
import { color, spacing } from '../../theme'

const logoMimir = require('../../../assets/images/mimir_white.png')
const checked = require('../../../assets/images/tick_gif.png')
const champions = require('../../../assets/images/champions-leage.jpeg')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: color.transparent,
	paddingHorizontal: spacing.medium,
}
const JOIN: ViewStyle = {
	marginTop: 20,
	borderRadius: 50,
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: '#78305F',
}
const BOLD: TextStyle = { fontWeight: 'bold' }
const DEMO_TEXT: TextStyle = {
	...BOLD,
	fontSize: 13,
	letterSpacing: 2,
}
const HEADER: TextStyle = {
	paddingTop: spacing.medium,
	paddingBottom: 0,
	paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
	...BOLD,
	fontSize: 12,
	lineHeight: 15,
	textAlign: 'center',
	letterSpacing: 1.5,
}

const TITLE: TextStyle = {
	fontSize: 28,
	lineHeight: 38,
	textAlign: 'center',
	marginTop: spacing.large,
	marginBottom: spacing.large,
}
const TAGLINE: TextStyle = {
	color: '#BAB6C8',
	fontSize: 15,
	lineHeight: 22,
	marginBottom: spacing.huge,
}
const QUESTION: TextStyle = {
	color: '#FFFFFF',
	fontSize: 22,
	fontWeight: '400',
	textAlign: 'center',
	lineHeight: 22,
}
const ANSWER: TextStyle = {
	color: 'rgb(109, 39, 84)',
	fontWeight: '400',
	fontSize: 20,
	lineHeight: 22,
}
const QUESTION_VIEW: ViewStyle = {
	backgroundColor: '#172347',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 62,
	padding: spacing.larger,
	marginTop: spacing.huge,
	marginBottom: spacing.massive,
}
const ANSWER_VIEW: ViewStyle = {
	backgroundColor: '#F2F2FF',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 50,
	padding: spacing.medium,
	marginBottom: spacing.large,
}
const SELECTED_ANSWER: TextStyle = {
	...ANSWER,
	color: '#FFFFFF',
}
const SELECTED_ANSWER_VIEW: ViewStyle = {
	...ANSWER_VIEW,
	backgroundColor: 'rgb(109, 39, 84)',
}
const MIMIR: ImageStyle = {
	marginVertical: 0,
	alignSelf: 'center',
	width: 120,
	height: 100,
}

export const QuestionScreen = () => {
	const [question_number, setQuestionNumber] = useState(1)
	// const [question, setQuestion] = useState(5)
	const [answer, setAnswer] = useState(5)
	const navigation = useNavigation()
	const goBack = () => navigation.goBack()

	// useEffect(() => {
	// 	setQuestion(data[i])
	// }, [question_number])

	const data = [
		{
			question: 'How many potatos does a potato have?',
			options: [
				{
					value: '4',
					correct: false,
				},
				{
					value: '7',
					correct: true,
				},
				{
					value: '33',
					correct: false,
				},
			],
		},

		{
			question: 'How many apples does an apple have?',
			options: [
				{
					value: '1',
					correct: false,
				},
				{
					value: '2',
					correct: false,
				},
				{
					value: '3',
					correct: true,
				},
			],
		},

		{
			question: 'How many bananas does a banana have?',
			options: [
				{
					value: '4',
					correct: false,
				},
				{
					value: '7',
					correct: true,
				},
				{
					value: '33',
					correct: false,
				},
			],
		},
	]

	socket.on('connect', () => {
		console.log('::::::::::::::::::::: SOCKET CONNECTED :::::::::::::::: ')
	})

	socket.on('RoomEnter', a => {
		console.log('::::::::::::::::::::: RoomEnter :::::::::::::::: ', a)
	})

	socket.on('question', q => {
		console.log('::::::::::::::::::::: question :::::::::::::::: ', q)
	})
	console.log('connect')

	if (question_number > data.length) {
		console.log('HELLO')
		setQuestionNumber(1)
		navigation.navigate('demo')
		return <View />
	}

	const selectAnswer = i => {
		setAnswer(i)
		setQuestionNumber(question_number + 1)
	}

	return (
		<View testID="GameScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.lightGreen}>
				<Header leftIcon="back" onLeftPress={goBack} style={HEADER} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				<Text style={TITLE} preset="header" text={`Question ${question_number} of ${data.length}`} />

				<View style={QUESTION_VIEW}>
					<Text style={QUESTION} text={data[question_number - 1].question} />
				</View>
				{data[question_number - 1].options.map((option, i) => (
					<TouchableWithoutFeedback onPress={() => selectAnswer(i)}>
						<View key={i} style={answer === i ? SELECTED_ANSWER_VIEW : ANSWER_VIEW}>
							<Text style={answer === i ? SELECTED_ANSWER : ANSWER} text={option.value} />
						</View>
					</TouchableWithoutFeedback>
				))}
			</Screen>
		</View>
	)
}
