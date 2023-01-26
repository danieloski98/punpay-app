import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

interface IProps {
    initialValues: any;
    validationSchema: Yup.ObjectSchema<any>;
    onSubmit: (values: any) => void;
    children: JSX.Element;
}

const FormContainer: React.FC<IProps> = (props) => {
  return (
    <Formik
        initialValues={props.initialValues}
        onSubmit={(values: any) => props.onSubmit(values)}
        validationSchema={props.validationSchema || null}
        enableReinitialize
    >
        {({}) => (
            <>
                {props.children}
            </>
        )}
    </Formik>
  )
}

export default FormContainer
