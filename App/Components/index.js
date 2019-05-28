import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils'
import CardView from 'react-native-cardview';

export const H2 = (props) => {
	return (
		<Text style={styles.text}>
			{props.children}
		</Text>
	)
}

export const H3 = (props) => {
	return (
		<Text style={[styles.text, styles.h3]}>
			{props.children}
		</Text>
	)
}

export const H4 = (props) => {
	return (
		<Text style={[styles.text, styles.h4]}>
			{props.children}
		</Text>
	)
}

export const H5 = (props) => {
	return (
		<Text style={[styles.text, styles.h5]}>
			{props.children}
		</Text>
	)
}

export const Wrapper = (props) => {
	return (
		<View style={[styles.container, { backgroundColor: props.color, padding: props.padding }]}>
			{props.children}
		</View>
	)
}

export const Separator = () => {
	return <View style={{ height: 1, backgroundColor: '#f2f2f2', marginTop: 10, marginBottom: 10 }}/>
}
export const Separator2 = () => {
	return <View style={{ height: 1, backgroundColor: '#fff', marginTop: 10, marginBottom: 10 }}/>
}

function _getJustify(type) {
	switch(type) {
		case 'between': return 'space-between'
		case 'center': return 'center'
		case 'around': return 'space-around'
		default: return 'flex-start'
	}
}

function _getAlign(type) {
	switch(type) {
		case 'start': return 'flex-start'
		case 'center': return 'center'
		case 'end': return 'flex-end'
		default: return 'flex-start'
	}
}

export const Row = (props) => {
	return (
		<View style={{
			flexDirection: 'row', 
			justifyContent: _getJustify(props.justify), 
			alignItems: _getAlign(props.align),
			...props.style,
		}}>
			{props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	text: {
		fontSize: 18,
		color: colors.black,
		//text
	},
	h3: {
		fontSize: 14,
	},
	h4: {
		fontSize: 10,
	},
	h5: {
		fontSize: 8,
	},
})