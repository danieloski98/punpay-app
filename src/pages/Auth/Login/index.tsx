import { View, Text, Alert } from "react-native";
import React, { useCallback } from "react";
import Box from "../../../components/General/Box";
import CustomText from "../../../components/General/Text";
import { Style } from "./style";
import { FormContainer, Submit, TextInput } from "../../../components/General";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../style/theme";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../state/Store";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import Axios from "../../../utils/api";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGGEDINSTATES } from "../../../enums/init.enum";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function Login({ navigation }: IProps) {
  const [showPass, setShowPass] = React.useState(false);
  const dispatch = useDispatch<Dispatch>();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => Axios.post('/user-auth/login', data),
    onSuccess: async (data) => {
      await AsyncStorage.setItem('token', data.data.data.token);
      await AsyncStorage.setItem(LOGGEDINSTATES.LOGGEDIN, 'true');
      const pin = await AsyncStorage.getItem("PIN");
      console.log(data.data.data);
      const str = JSON.stringify(data.data.data.user);
      await AsyncStorage.setItem('user', str);
      dispatch.User.update(data.data.data.user, null);
      if (!data.data.data.user.emailVerified) {
        Alert.alert('Notice', 'You need to verify you email')
        navigation.navigate('verifyemail', { email: data.data.data.user.email });
        return;
      }else if (pin === null || pin === undefined) {
        navigation.navigate('setpin');
        return
      } else {
        // await AsyncStorage.removeItem('PIN');
        dispatch.User.update(data.data.data.user, null);
        dispatch.loggedIn.login();
      }
    },
    onError: (error: any)=> {
      Alert.alert('Error', error);
    }
  })

  const theme = useTheme<Theme>();

  const submit = useCallback((data: any) => {
    mutate(data)
  }, [])

  return (
    <FormContainer
        validationSchema={validationSchema}
        initialValues={{
            email: '',
            password: ''
        }}
        onSubmit={submit}
    >
      <Box
        backgroundColor="mainBackground"
        flex={1}
        style={{ paddingHorizontal: 0 }}
      >
        <View style={{ ...Style.text, paddingHorizontal: 20 }}>
          <CustomText variant="subheader">Login</CustomText>
          <CustomText variant="bodylight">
            Enter your login details to continue
          </CustomText>
        </View>

        <ScrollView
          bounces
          style={{
            flex: 1,
            marginBottom: 50,
            backgroundColor: "transparent",
            paddingHorizontal: 20,
          }}
          contentContainerStyle={{ marginBottom: 50 }}
        >
          <View style={Style.box}>
            <TextInput
            keyboardType="email-address"
             name="email"
             label="Email"
              leftElement={
                <Feather
                  name="mail"
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
            />
          </View>

          <View style={Style.box}>
            <TextInput
                keyboardType="visible-password"
                name="password"
                label="Password"
                isPassword={!showPass}
              leftElement={
                <Feather
                  name="lock"
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
              rightElement={
                <Feather
                  onPress={() => setShowPass((prev) => !prev)}
                  name={showPass ? "eye" : "eye-off"}
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
            />
          </View>

          <CustomText
            variant="bodylight"
            textAlign="right"
            marginTop="m"
            onPress={() => navigation.navigate("forgotpassword")}
          >
            Forgot Password ?
          </CustomText>

          <View style={Style.btnC}>
            <Submit text="Submit" isLoading={isLoading} />
          </View>

          <View style={Style.textBox}>
            <CustomText
              variant="bodylight"
              textAlign="center"
              onPress={() => navigation.navigate("signup")}
            >
              Don't have an account ?
              <CustomText
                variant="body"
                textDecorationLine="underline"
                marginLeft="s"
              >
                Sign up
              </CustomText>
            </CustomText>
          </View>
        </ScrollView>
      </Box>
    </FormContainer>
  );
}
