import React, { useState, useEffect } from 'react'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet, Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { translate } from '../../i18n'
import { color, spacing } from '../../theme'
import { Text } from '../text/text'
import { QuestionProps } from './question.props'

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
const RESULT: TextStyle = {
	color: '#ffffff',
	fontWeight: '600',
	fontSize: 22,
	lineHeight: 22,
}
const RESULT_VIEW: ViewStyle = {
	height: 60,
	justifyContent: 'center',
	alignItems: 'center',
}
const QUESTION_VIEW: ViewStyle = {
	backgroundColor: '#172347',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 62,
	padding: spacing.larger,
	marginTop: spacing.huge,
}
const ANSWER_VIEW: ViewStyle = {
	flexDirection: 'row',
	backgroundColor: '#F2F2FF',
	justifyContent: 'space-around',
	alignItems: 'center',
	borderRadius: 50,
	padding: spacing.medium,
	marginBottom: spacing.large,
}
const SELECTED_ANSWER: TextStyle = {
	...ANSWER,
	color: '#FFFFFF',
}

const CORRECT_ANSWER: ViewStyle = {
	...ANSWER_VIEW,
	backgroundColor: '#04E2B7',
}
const WRONG_ANSWER: ViewStyle = {
	...ANSWER_VIEW,
	backgroundColor: '#6D2754',
}
const SELECTED_ANSWER_VIEW: ViewStyle = {
	...ANSWER_VIEW,
	backgroundColor: '#038298',
}
export function Question(props: QuestionProps) {
	const [answerResult, setAnswerResult] = useState(null)
	const [answer, setAnswer] = useState(null)
	const { data, onPress, showResult } = props

	useEffect(() => {
		if (showResult) {
			setAnswerResult(answer != null && data.options[answer].correct ? 'Correct' : 'Wrong')
		}
	}, [showResult, answer])

	useEffect(() => {
		console.log('>> >> >> ??? null null', data)

		setAnswerResult(null)
		setAnswer(null)
	}, [data.question])

	const selectAnswer = i => {
		console.log('FIRST TIME', i)
		if (answer || answer === 0) return
		setAnswer(i)
		onPress(i)
	}

	const renderOptions = () => {
		return data.options.map((option, i) => (
			<TouchableWithoutFeedback key={i} onPress={() => selectAnswer(i)} disabled={showResult || answer}>
				<View
					style={
						answer === i
							? !showResult
								? SELECTED_ANSWER_VIEW
								: option.correct
								? CORRECT_ANSWER
								: WRONG_ANSWER
							: !showResult
							? ANSWER_VIEW
							: option.correct
							? CORRECT_ANSWER
							: ANSWER_VIEW
					}>
					<Text style={answer === i ? SELECTED_ANSWER : ANSWER} text={option.value} />
					{showResult && <Text style={answer === i ? SELECTED_ANSWER : ANSWER} text={option.answers + 'K'} />}
				</View>
			</TouchableWithoutFeedback>
		))
	}

	return (
		<>
			<View style={QUESTION_VIEW}>
				<Text style={QUESTION} text={data.question} />
			</View>
			<View style={RESULT_VIEW} />
			{renderOptions()}
		</>
	)
}
