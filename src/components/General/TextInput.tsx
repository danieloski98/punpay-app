import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../style/theme'
import { ErrorMessage, useFormikContext } from 'formik'
import CustomText from './Text'


interface IProps {
    label?: string;
    name: string;
    rightElement?: JSX.Element;
    leftElement: JSX.Element;
    isPassword?: boolean;
}

export const  CustomInput: React.FC<IProps & TextInputProps> = (props) => {
  const [focused, setFocused] = React.useState(false);
  const theme = useTheme<Theme>();

  // formik context
  const { values, handleChange, handleBlur, setFieldTouched } = useFormikContext();

  const handleFocus = useCallback(() => {
    setFocused(true);
    setFieldTouched(props.name, true, true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
    handleBlur(props.name);
  }, []);

  return (
    <>
      <CustomText variant="body">{props.label ?? ''}</CustomText>
        <View style={{...Style.parent, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, borderColor: focused ? theme.colors.primaryColor:'transparent' }}>
            {props.leftElement}
            <TextInput {...props} secureTextEntry={props.isPassword ? true:false} value={values[props.name]} style={{  paddingHorizontal: 10, flex: 1 }} onFocus={handleFocus} onBlur={onBlur} onChangeText={handleChange(props.name)} />
            {props.rightElement}
        </View>
        <ErrorMessage name={props.name} render={(msg) =>  <CustomText variant="xs" style={Style.text}>{msg}</CustomText>} />
    </>
  )
}

export default CustomInput;

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