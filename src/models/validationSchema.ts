import * as yup from 'yup';

const VerifyEmailSchema = yup.object().shape({
    code: yup.string().required('The code is required'),
});

const BankSchema = yup.object().shape({
    accountNumber: yup.string().required('The account number is required'),
});

export { VerifyEmailSchema, BankSchema };