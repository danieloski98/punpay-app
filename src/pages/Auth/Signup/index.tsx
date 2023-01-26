import { Alert, View } from "react-native";
import React, { useState } from "react";
import Box from "../../../components/General//Box";
import CustomText from "../../../components/General//Text";
import { Style } from "./style";
import { FormContainer, Submit, TextInput } from "../../../components/General";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../style/theme";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as yup from "yup";
import { useMutation } from '@tanstack/react-query'
import Axios from "../../../utils/api";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../state/Store";
import AsyncStorage from '@react-native-async-storage/async-storage'


const validationSchema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required().min(8),
});

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function Signup({ navigation }: IProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const theme = useTheme<Theme>();
  const dispatch = useDispatch<Dispatch>()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => Axios.post('/user-auth/create/account', data),
    onSuccess: (data) => {
      AsyncStorage.setItem('token', data.data.data.token);
      const str = JSON.stringify(data.data.data.user);
      AsyncStorage.setItem('user', str);
      dispatch.User.update(data.data.data.user, null);
      navigation.navigate("verifyemail", {
        email
      });
    },
    onError: (error: any) => {
      console.log(error);
      Alert.alert('Error', error);
    }
  })

  const submit = (data: any) => {
    console.log(data);
    setEmail(data.email);
    mutate(data);
  };

  return (
    <FormContainer
      validationSchema={validationSchema}
      onSubmit={(data) => submit(data)}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
    >
      <Box
        backgroundColor="mainBackground"
        flex={1}
        style={{ paddingHorizontal: 0 }}
      >
        <View style={{ ...Style.text, paddingHorizontal: 20 }}>
          <CustomText variant="subheader">Create Account</CustomText>
          <CustomText variant="bodylight">Getting started is easy</CustomText>
        </View>

        <ScrollView
          bounces
          style={{
            flex: 1,
            marginBottom: 0,
            backgroundColor: "transparent",
            paddingHorizontal: 20,
          }}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={Style.box}>
            <TextInput
              name="firstName"
              leftElement={
                <Feather
                  name="user"
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
              label="First Name"
            />
          </View>

          <View style={Style.box}>
            <TextInput
              name="lastName"
              label="Last Name"
              leftElement={
                <Feather
                  name="user"
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
            />
          </View>

          <View style={Style.box}>
            <TextInput
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
             label="Password"
              name="password"
              isPassword={!showPassword}
              leftElement={
                <Feather
                  name="lock"
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
              rightElement={
                <Feather
                  onPress={() => setShowPassword((prev) => !prev)}
                  name={showPassword ? "eye" : "eye-off"}
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
            />
          </View>

          {/* <View style={Style.box}>
  <View style={Style.checkbox}>
    <Checkbox value={alpha} color={theme.colors.primaryColor}  />
    <CustomText variant="bodylight" marginLeft="s">Use alphabets & numbers</CustomText>
  </View>

  <View style={Style.checkbox}>
    <Checkbox value={len} color={theme.colors.primaryColor}  />
    <CustomText variant="bodylight" marginLeft="s">At least 8 characters</CustomText>
  </View>

  <View style={Style.checkbox}>
    <Checkbox value={sym} color={theme.colors.primaryColor}  />
    <CustomText variant="bodylight" marginLeft="s">Use a special character e.g @,#,% etc</CustomText>
  </View>
</View> */}

          <View style={Style.btnC}>
            <Submit text="Submit" isLoading={isLoading} />
          </View>

          <View style={Style.textBox}>
            <CustomText
              variant="bodylight"
              textAlign="center"
              onPress={() => navigation.navigate("login")}
            >
              Already have an account ?
              <CustomText
                variant="body"
                textDecorationLine="underline"
                marginLeft="s"
              >
                Login
              </CustomText>
            </CustomText>
          </View>
        </ScrollView>
      </Box>
    </FormContainer>
  );
}
