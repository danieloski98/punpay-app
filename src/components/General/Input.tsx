import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../style/theme'
import { ErrorMessage, useFormikContext } from 'formik'
import CustomText from './Text'


interface IProps {
    label?: string;
    rightElement?: JSX.Element;
    leftElement?: JSX.Element;
    isPassword?: boolean;
    value: string;
    onChange: (e: string) => void;
}

export const  Input: React.FC<IProps & TextInputProps> = (props) => {
  const [focused, setFocused] = React.useState(false);
  const theme = useTheme<Theme>();

  // formik context
  const { values, handleChange, handleBlur, setFieldTouched } = useFormikContext();

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <>
      <CustomText variant="body">{props.label ?? ''}</CustomText>
        <View style={{...Style.parent, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, borderColor: focused ? theme.colors.primaryColor:'transparent' }}>
            {/* {props.leftElement} */}
            <TextInput {...props} placeholder='Search ' style={{  paddingHorizontal: 10, flex: 1, color: theme.colors.text }} onChangeText={(e) => props.onChange(e)} />
            {/* {props.rightElement} */}
        </View>
    </>
  )
}

export default Input;

export const Style = StyleSheet.create({
    parent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
    },
    text: {color: 'red'}
});