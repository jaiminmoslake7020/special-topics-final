import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { Form, Input, Button } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import { ADD_BOAT , GET_BOATS } from '../../queries'

const AddBoat = () => {
  const [id] = useState(uuidv4())
  const [addBoat] = useMutation(ADD_BOAT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values

    addBoat({
      variables: {
        id,
        year, make, model, price, personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addPerson: {
          __typename: 'Boat',
          id,
          year, make, model, price, personId
        }
      },
      update: (proxy, { data: { addBoat } }) => {
        const data = proxy.readQuery({ query: GET_BOATS , variables : { personId : personId } })
        proxy.writeQuery({
          query: GET_BOATS,
          variables: { personId : personId } ,
          data: {
            ...data,
            boatsByPerson: [...data.boatsByPerson, addBoat ]
          }
        })
      }
    })
  }

  return (
    <Form
      form={form}
      name='add-person-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input your year!' }]}
      >
        <Input placeholder='i.e. 2020' />
      </Form.Item>
      <Form.Item
          name='make'
          rules={[{ required: true, message: 'Please input your make!' }]}
      >
        <Input placeholder='i.e. Ford' />
      </Form.Item>
      <Form.Item
          name='model'
          rules={[{ required: true, message: 'Please input your model!' }]}
      >
        <Input placeholder='i.e. vista' />
      </Form.Item>
      <Form.Item
          name='price'
          rules={[{ required: true, message: 'Please input your price!' }]}
      >
        <Input placeholder='i.e. 202020' />
      </Form.Item>
      <Form.Item
          name='personId'
          rules={[{ required: true, message: 'Please input your personId!' }]}
      >
        <Input placeholder='i.e. 1' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Boat
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddBoat
