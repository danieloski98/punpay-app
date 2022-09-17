import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import { Container } from './styles';
import Onboarding from '../Screens/auth/screen/onboarding'
import Login from '../Screens/auth/screen/login';
import Signup from '../Screens/auth/screen/signup';
import VerifyEmail from '../Screens/auth/screen/verifyemail';
import BioMetricSetup from '../Screens/auth/screen/biometrics';
import SetPin from '../Screens/auth/screen/setpin';
import ForgotPassword from '../Screens/auth/screen/forgotpassword';
import ResetCode from '../Screens/auth/screen/ResetCode';
import ResetPassword from '../Screens/auth/screen/resetpassword';
import Pin from '../Screens/auth/screen/Pin';

const { Navigator, Screen } = createNativeStackNavigator();

const AuthenticationNavigation: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="onboarding" component={Onboarding} />
        <Screen name="login" component={Login} />
        <Screen name="signup" component={Signup} />
        <Screen name="verifyemail" component={VerifyEmail} />
        <Screen name="biometric" component={BioMetricSetup} />
        <Screen name="setpin" component={SetPin} />
        <Screen name="forgotpassword" component={ForgotPassword} />
        <Screen name="resetcode" component={ResetCode} />
        <Screen name="resetpassword" component={ResetPassword} />
        <Screen name="pin" component={Pin} options={{ presentation: 'modal' }} />
    </Navigator>
  )
}

export default AuthenticationNavigation;