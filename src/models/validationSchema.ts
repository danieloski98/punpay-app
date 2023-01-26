import * as yup from 'yup';

const VerifyEmailSchema = yup.object().shape({
    code: yup.string().required('The code is required'),
});

export { VerifyEmailSchema };