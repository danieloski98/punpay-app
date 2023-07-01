import { View, Text, Image } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import { PrimaryButton, Text as CustomText } from '../../../General'
import { Transaction } from '../../../../models/transaction'
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../style/theme';
import SadFace from '../../../../res/svg-output/Sadf'

interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: Transaction;
}

const TYPES = [0,1,3,4];

const TransactionDetails = ({ close, transaction }: IProps) => {
  const theme = useTheme<Theme>();
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    bottomSheetRef.current?.present();
  });

  const transactionType = React.useCallback(() => {
    switch(transaction.transactionType) {
      case 0: {
        return 'Deposit'
      }
      case 1: {
        return 'Sell'
      }
      case 2: {
        return 'Buy'
      }
      case 3: {
        return 'Swap'
      }
      case 4: {
        return 'Send'
      }
    }
  }, [transaction]);

  const transactionStatus = React.useCallback(() => {
    switch(transaction.status) {
      case 0: {
        return 'Pending'
      }
      case 1: {
        return 'Processing'
      }
      case 2: {
        return 'Payment Recieved'
      }
      case 3: {
        return 'Paid'
      }
      case 4: {
        return 'Failed'
      }
    }
  }, [transaction]);

  return (
    <ModalWrapper
      ref={bottomSheetRef}
      onClose={() => close(false)}
      snapPoints={['80%']}
    >
      <View style={{ flex: 1, paddingTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 20 }}>Transaction Details</CustomText>
        <CustomText variant="bodylight">Transaction Status - {transactionStatus()}</CustomText>

        <View style={{ width: '100%', height: 150, alignItems: 'center' }}>
          {transaction.status <= 2 && <Image source={require('../../../../res/svgs/hourp.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />}
          {transaction.status === 3 && <Image source={require('../../../../res/rocket.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />}
          {transaction.status === 4 && <SadFace width={279} height={203} />}
        </View>

        <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction ID</CustomText>
          <CustomText variant="bodylight" style={{ fontSize: 16 }} selectable>
            {transaction.id}
          </CustomText>
        </View>

        <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Type</CustomText>
          <CustomText variant="bodylight" style={{ fontSize: 16 }} selectable>
            {transactionType()}
          </CustomText>
        </View>

        {transaction.transactionType === 2 && (
          <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
            <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Reference</CustomText>
            <CustomText variant="bodylight" style={{ fontSize: 16 }} selectable selectionColor={theme.colors.primaryColor}>
              {transaction.transactionReference}
            </CustomText>
          </View>
        )}

        <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>{transactionType()} Currency</CustomText>
          <CustomText variant="bodylight" style={{ fontSize: 16 }}>
            {transaction.transactionCurrency}
          </CustomText>
        </View>

        <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>{transactionType()} Amount</CustomText>
          <CustomText variant="bodylight" style={{ fontSize: 16 }}>
            {transaction.transactionAmount}
          </CustomText>
        </View>

        {
          TYPES.includes(transaction.transactionType) && (
            <View style={{ paddingVertical: 20, flexDirection: 'column' }}>
              <CustomText variant="subheader" style={{ fontSize: 16 }}>Hash</CustomText>
              <CustomText variant="bodylight" style={{ fontSize: 16 }} selectable>
                {transaction.hash}
              </CustomText>
            </View>
          )
        }


        {transaction.transactionType !== 4 && transaction.transactionType !== 0 && (
          <>
          <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
              <CustomText variant="subheader" style={{ fontSize: 16 }}>Payout Currency</CustomText>
              <CustomText variant="bodylight" style={{ fontSize: 16 }}>
                {transaction.payoutCurrency}
              </CustomText>
            </View>

            <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
              <CustomText variant="subheader" style={{ fontSize: 16 }}>Payout Amount</CustomText>
              <CustomText variant="bodylight" style={{ fontSize: 16 }}>
                {transaction.transactionType === 3 && (
                  (transaction.payoutAmount - transaction.payoutAmount / 100 * 5)
                )}
                {transaction.payoutAmount}
              </CustomText>
            </View>

          </>
        )}

        {transaction.transactionType === 3 && (
          <View style={{ paddingVertical: 20, flexDirection: 'column' }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Fee</CustomText>
          <CustomText variant="bodylight" style={{ fontSize: 16 }}>
            {(transaction.payoutAmount / 100 * 5).toFixed(2)}
          </CustomText>
        </View>
        )}

        <View style={{ paddingVertical: 20, flexDirection: 'column' }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>Date</CustomText>
          <CustomText variant="bodylight" style={{ fontSize: 16 }}>
            {new Date(transaction.createdAt).toDateString()}
          </CustomText>
        </View>

        <View>
          <PrimaryButton text="Done" action={() => close(false)} />
        </View>
      </View>
    </ModalWrapper>
  )
}

export default TransactionDetails