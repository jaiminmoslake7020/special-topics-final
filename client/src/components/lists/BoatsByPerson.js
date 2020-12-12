import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOATS } from '../../queries'
import { useParams } from "react-router-dom";

import { List } from 'antd'

import Boat from '../listItems/Boat'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const BoatsByPerson = () => {
  const styles = getStyles()

  let { id } = useParams();

  let idString = id.toString();
  const { loading, error, data } = useQuery(GET_BOATS , {
    variables: { personId: idString },
  } )



  if (loading) return 'Loading...'
  if (error) return `Errror! ${error.message}`
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.boatsByPerson.map(({ id, year, make,  model, price , personId}) => (
        <List.Item key={id}>
          <Boat key={id} id={id} year={year} make={make} model={model} price={price} personId={personId} />
        </List.Item>
      ))}
    </List>
  )
}

export default BoatsByPerson
