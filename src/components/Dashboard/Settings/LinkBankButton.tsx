import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { Pressable, ActivityIndicator, Alert } from 'react-native'
import navigation from '../../../navigation'
import theme from '../../../style/theme'
import CustomText from '../../General/Text'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'

const LinkBankButton = () => {
    const dispatch = useDispatch<Dispatch>();  
    const bank = useSelector((state: RootState) => state.Bank);
    const [hasBank, setHasBank] = React.useState(false)
    const navigation = useNavigation<any>()
    const { isLoading, data } = useQuery(['GetBank'], () => Axios.get('/bank/user'), {
        onSuccess: (data) => {
            dispatch.Bank.update(data.data.data, null);
            setHasBank(true);
        },
        onError: (error: any) => {
            setHasBank(false);
        }
    });

    React.useEffect(() => {
      console.log(bank);
    }, [bank])
  return (
    <Pressable onPress={() => navigation.navigate('link-bank')} style={{ width: '100%', height: theme.button.height, backgroundColor: 'lightgrey', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          {isLoading && <ActivityIndicator color={theme.colors.primaryColor} size='large' />}
          {!isLoading && <CustomText variant="body" style={{ color: '#5149F7' }}>{hasBank ? 'Update Bank' : 'LINK'}</CustomText>}
    </Pressable>
  )
}

export default LinkBankButton
