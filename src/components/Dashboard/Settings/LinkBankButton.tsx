import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { Pressable, ActivityIndicator, Alert, View } from 'react-native'
import navigation from '../../../navigation'
import theme from '../../../style/theme'
import CustomText from '../../General/Text'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'
import Bank from '../../../res/svg-output/Bank'

const LinkBankButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const bank = useSelector((state: RootState) => state.Bank);
  const [hasBank, setHasBank] = React.useState(false)
  const navigation = useNavigation<any>()
  const { isLoading, data } = useQuery(['GetBank'], () => Axios.get('/bank/user'), {
    refetchInterval: 1200,
    refetchOnMount: true,
    onSuccess: (data) => {
      dispatch.Bank.update(data.data.data);
      setHasBank(true);
    },
    onError: (error: any) => {
      setHasBank(false);
    }
  });

  if (isLoading) {
    return (
      <View style={{ width: '100%', height: 55, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color={theme.colors.primaryColor} size='large' />
      </View>
    )
  }

  return (
    <>
      {hasBank && (
        <View style={{ marginTop: 20, width: '100%', }}>
          <CustomText variant="subheader" style={{ fontSize: 18 }}>Bank Account</CustomText>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, width: '100%' }}>
            <Bank width={70} height={70} />

            <View style={{ paddingLeft: 20, flex: 0.8 }}>
              <CustomText variant="subheader" style={{ fontSize: 16, flex: 1, flexWrap: 'wrap' }}>{bank.accountName}</CustomText>
              <CustomText variant="xs" style={{ fontSize: 14 }}>{bank.name}</CustomText>
              <CustomText variant="xs" style={{ fontSize: 14 }}>{bank.accountNumber}</CustomText>
            </View>

            <Pressable onPress={() => navigation.navigate('link-bank')} style={{ flex: 0.3, justifyContent: 'center' }}>
              <CustomText variant="subheader" style={{ fontSize: 16, color: theme.colors.primaryColor }}>Update</CustomText>
            </Pressable>
          </View>
        </View>
      )}
      {!hasBank && (
        <Pressable onPress={() => navigation.navigate('link-bank')} style={{ width: '100%', height: theme.button.height, backgroundColor: 'lightgrey', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          {!isLoading && <CustomText variant="body" style={{ color: '#5149F7' }}>LINK</CustomText>}
        </Pressable>
      )}
    </>

  )
}

export default LinkBankButton
