import React, { useState } from 'react'
import {Button, Card, List, Anchor  } from 'antd'
const { Link } = Anchor

import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import RemovePerson from '../buttons/RemovePerson'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Person = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()

  const boatDetails = () => {
    return `${props.year} ${props.make} ${props.model} ${props.price} ${props.personId}`
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <List.Item key={props.id}>
      {editMode ? (
        <UpdatePerson
          id={id}
          year={year} make={make} model={model} price={price} personId={personId}
        />
      ) : (
        <Card
          actions={[
            <Anchor  >
              <Link target={"_blank"} href={"localhost:3000/person/"+id} title="More Info" />
            </Anchor>,
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson  id={id}
                      year={year} make={make} model={model} price={price} personId={personId} />
          ]}
          style={styles.card}
        >
          {boatDetails()}
        </Card>
      )}
    </List.Item>
  )
}

export default Person
