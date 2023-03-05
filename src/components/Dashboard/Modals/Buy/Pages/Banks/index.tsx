import { View, Text } from 'react-native'
import React from 'react'
import { Box } from '../../../../../General'
import CustomText from '../../../../../General/Text'
import BankChip from './BankChip';
import { IBank } from '../../../../../../models/bank';
import { useQuery } from '@tanstack/react-query';
import Axios from '../../../../../../utils/api';

interface IProps {
    action: (bank: IBank) => void;
}

const Bank = ({ action }: IProps) => {
  const { isLoading, data } = useQuery(['getBanks'], () => Axios.get('/bank/admin'), {
    refetchOnMount: true,
    refetchInterval: 2000
  })
  if (!isLoading && data) {
    console.log();
  }
  return (
    <Box flex={1}>
        <CustomText variant='subheader'>P2P Transaction</CustomText>
        <CustomText>Please select a merchant to trade with</CustomText>

        {!isLoading && (data.data.data as Array<IBank>).length > 0 && (
          <View style={{ marginTop: 20 }}>
            {(data.data.data as Array<IBank>).map((item, index) => (
                <BankChip bank={item} key={index} action={action} />
            ))}
        </View>
        )}

      {!isLoading && (data.data.data as Array<IBank>).length < 1 && (
          <View style={{ marginTop: 20 }}>
           <CustomText variant='body' textAlign='center' color='primaryColor'>No P2P Trader available</CustomText>
        </View>
        )}
    </Box>
  )
}

export default Bank;