import {gql} from '@apollo/client'

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`


export const GET_BOATS = gql`
  query BoatsByPerson( $personId: String! ) {
        boatsByPerson ( personId: $personId ) {
            id
            year
            make
            model
            price
            personId
        }
    }
`



export const ADD_BOAT = gql`
  mutation AddBoat($id: String!, $year: String!, $make: String!,  $model: String!, $price: String!,  $personId: String!) {
    addBoat(id: $id, year: $year, make: $make, model:$model, price:$price, personId:$personId ) {
     id
     year
     model
     price
     personId
    }
  }
`

export const UPDATE_BOAT = gql`
  mutation UpdateBoat($id: String!, $year: String!, $make: String!,  $model: String!, $price: String!,  $personId: String!) {
    updateBoat(id: $id, year: $year, make: $make, model:$model, price:$price, personId:$personId ) {
     id
     year
     model
     price
     personId
    }
  }
`

export const REMOVE_BOAT = gql`
  mutation RemoveBoat($id: String!) {
    removeBoat(id: $id) {
     id
     year
     model
     price
     personId
    }
  }
`
