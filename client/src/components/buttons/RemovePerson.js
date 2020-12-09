import React from 'react'
import { useMutation } from '@apollo/client'
import { filter } from 'lodash'
import { GET_PEOPLE, REMOVE_PERSON } from '../../queries'
import { DeleteOutlined } from '@ant-design/icons'

const RemovePerson = ({ id, firstName, lastName }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(proxy, { data: { removePerson } }) {
      const { people } = proxy.readQuery({ query: GET_PEOPLE })
      proxy.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, c => {
            return c.id !== removePerson.id
          })
        }
      })
    }
  })
  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?')
    if (result) {
      removePerson({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removePerson: {
            __typename: 'Person',
            id,
            firstName,
            lastName
          }
        }
      })
    }
  }
  return (
    <DeleteOutlined
      key='delete'
      onClick={handleButtonClick}
      style={{ color: 'red' }}
    />
  )
}

export default RemovePerson
