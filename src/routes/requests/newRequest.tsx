import * as React from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { CoreLayout } from '../../layouts/CoreLayout'
import { DefaultContent } from '../../layouts/DefaultContent'
import { Link, PrimaryText } from '../../components/typography'
import { Field, FieldProps, Form, Formik } from 'formik'
import { CustomInput } from '../../components/Input/Input'
import styled from 'styled-components/macro'
import { PrimaryButton } from '../../components/Button'
import { createPictureRequest } from '../../api/requests'

interface IFormValues {
  name: string
  year: number
  amountOfPictures: number
}

const FormContainer = styled.div`
  form > * {
    margin-top: 30px;
  }

  max-width: 500px;
`

export const NewRequest: React.FC<RouteComponentProps> = React.memo(() => {
  const initialValues: IFormValues = {
    name: '',
    year: 0,
    amountOfPictures: 0,
  }

  const navigate = useNavigate()
  return (
    <CoreLayout withCategoriesLeftMenu={false}>
      <DefaultContent header="New request" extraHeader={<Link to="/requests">Back to my requests</Link>}>
        <PrimaryText>
          Please fill in the form. Our staff will try to fulfill your request and publish the photo in 3
          business days.
        </PrimaryText>

        <FormContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true)
              const response = await createPictureRequest(values)
              actions.setSubmitting(false)
              console.log({ data: response.data })
              navigate(`/requests/${response.data.id}`)
            }}>
            <Form>
              <Field name="name">
                {({ field, meta, form }: FieldProps<IFormValues['name']>) => (
                  <CustomInput
                    label="Picture name"
                    scaleMultiplier={2}
                    error={meta.error}
                    type="text"
                    value={field.value}
                    cheerfulTextMessages={[
                      'Start typing',
                      'You can do it!',
                      'Almost there...',
                      'Just one more to go',
                      'Hooray!',
                    ]}
                    onChange={value => {
                      form.setFieldValue('name', value)
                    }}
                  />
                )}
              </Field>

              <Field name="year">
                {({ field, meta, form }: FieldProps<IFormValues['year']>) => (
                  <CustomInput
                    label="Year taken"
                    value={field.value}
                    scaleMultiplier={2}
                    error={meta.error}
                    type="number"
                    onChange={value => {
                      form.setFieldValue('year', value)
                    }}
                  />
                )}
              </Field>

              <Field name="amountOfPictures">
                {({ field, meta, form }: FieldProps<IFormValues['amountOfPictures']>) => (
                  <CustomInput
                    label="Amount of pictures"
                    type="number"
                    value={field.value}
                    scaleMultiplier={2}
                    error={meta.error}
                    onChange={value => {
                      form.setFieldValue('amountOfPictures', value)
                    }}
                  />
                )}
              </Field>

              <PrimaryButton type="submit">Submit</PrimaryButton>
            </Form>
          </Formik>
        </FormContainer>
      </DefaultContent>
    </CoreLayout>
  )
})
