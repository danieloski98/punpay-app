import { View, Text, TextInputProps } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'


interface IProps {
    props: TextInputProps;
    rightElement?: JSX.Element;
    leftElement: JSX.Element;
}

export default function CustomInput({ props, rightElement, leftElement }: IProps) {
  const [focused, setFocused] = React.useState(false);
  const theme = useTheme<Theme>();

  return (
    <View style={{...Style.parent, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, borderColor: focused ? theme.colors.primaryColor:'transparent' }}>
      {leftElement}
      <TextInput {...props} style={{  paddingHorizontal: 10, flex: 1 }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      {rightElement}
    </View>
  )
}