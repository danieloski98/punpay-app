import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import Onboarding from '../pages/Auth/Onboarding/index'
import Signup from '../pages/Auth/Signup';
import Login from '../pages/Auth/Login';
import VerifyEmail from '../pages/Auth/verifyemail'
import BioMetricSetup from '../pages/Auth/biometrics';
import SetPin from '../pages/Auth/setpin';
import ForgotPassword from '../pages/Auth/forgotpassword';
import ResetCode from '../pages/Auth/ResetCode';
import ResetPassword from '../pages/Auth/resetpassword';

const { Navigator, Screen } = createNativeStackNavigator();

const AuthenticationFlow = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='onboarding'>
        <Screen name="signup" component={Signup} />
        <Screen name="login" component={Login} />
        <Screen name='onboarding' component={Onboarding} />
        <Screen name="verifyemail" component={VerifyEmail} />
        <Screen name="biometric" component={BioMetricSetup} />
        <Screen name="setpin" component={SetPin} />
        <Screen name="forgotpassword" component={ForgotPassword} />
        <Screen name="resetcode" component={ResetCode} />
        <Screen name="resetpassword" component={ResetPassword} />
    </Navigator>
  )
}

export default AuthenticationFlow
