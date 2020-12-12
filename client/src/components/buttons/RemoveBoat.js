import React from 'react'
import { useMutation } from '@apollo/client'
import { filter } from 'lodash'
import { GET_BOATS, REMOVE_BOAT } from '../../queries'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveBoat = ({ id, year, make, model , price, personId }) => {
  const [removeBoat] = useMutation(REMOVE_BOAT, {
    update(proxy, { data: { removeBoat } }) {
      const { people } = proxy.readQuery({ query: GET_BOATS , variables : {
       personId: personId
        } })
      proxy.writeQuery({
        query: GET_BOATS,
        data: {
          people: filter(people, c => {
            return c.id !== removeBoat.id
          })
        }
      })
    }
  })
  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this boat?')
    if (result) {
      removeBoat({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removePerson: {
            __typename: 'Boat',
            id,
            year,
            make,
            model ,
            price,
            personId
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

export default RemoveBoat
