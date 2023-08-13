import * as yup from 'yup';

const VerifyEmailSchema = yup.object().shape({
    code: yup.string().required('The code is required'),
});

const BankSchema = yup.object().shape({
    accountNumber: yup.string().required('The account number is required'),
});


const forgotPasswordSchema = yup.object().shape({
    email: yup.string().required().email()
})

const resetPasswordSchema = yup.object().shape({
    code: yup.string().required('OTP required'),
    newPassword: yup
        .string()
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
            message: 'Minimum 8 characters, at least an uppercase, lowercase, number and special character*',
        })
        .required('This field is required*'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords do not match!')
        .required('This field is required*'),
})

const changePasswordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
            message: 'Minimum 8 characters, at least an uppercase, lowercase, number and special character*',
        })
        .required('This field is required*'),
    oldPassword: yup
        .string()
        .required('This field is required*'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords do not match!')
        .required('This field is required*'),
})

const nextofkinSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email('Invalid email'),
    phoneNumber: yup.string(),
    relationship: yup.string().required(),
})

const verificationSchema = yup.object().shape({
    identification_number: yup.string().required(),
    identification_name: yup.string().required(),
});

const editSchema = yup.object().shape({
    phone: yup.string().required().min(11),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
});

export { VerifyEmailSchema, BankSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema, nextofkinSchema, verificationSchema, editSchema };