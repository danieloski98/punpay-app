import { View, Text, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import React from 'react'
import { Theme } from '../../style/theme';
import { useTheme } from '@shopify/restyle';

interface IData {
    label: string;
    value: string;
}

interface IProps {
    value: Array<IData>;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: () => void;
    focus?: boolean
}

const FormSelect: React.FC<IProps> = ({ focus }) => {
    const [value, setValue] = React.useState('');
    const theme = useTheme<Theme>()


    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    return (
        <Dropdown
            style={{ ...Style.parent, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, borderColor: focus ? theme.colors.primaryColor:'transparent'  }}
            placeholderStyle={Style.placeholderStyle}
            selectedTextStyle={Style.selectedTextStyle}
            inputSearchStyle={Style.inputSearchStyle}
            iconStyle={Style.iconStyle}
            data={data}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField={value}
            placeholder={'Select item'}
            value={value}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={(item: IData) => {
                setValue(item.value);
                // setIsFocus(false);
            }}
        />
    )
}

export const Style = StyleSheet.create({
    parent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
    },
    text: {color: 'red'},
    icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
});

export default FormSelect