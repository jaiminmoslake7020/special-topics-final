import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const boats = [
  {
    id: '1',
    year: '2019',
    make: 'Yamaha',
    model: '212SX',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Mastercraft',
    model: 'Prostar 214',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Hydra Sports',
    model: 'Custom 4200 SF',
    price: '200000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Kingfisher',
    model: '3025',
    price: '130000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Duckworth',
    model: 'Offshore XL',
    price: '700000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Eaglecraft',
    model: '4300 Cruiser',
    price: '450000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Coastal Craft',
    model: '33 Express',
    price: '500000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Bayliner',
    model: 'Element XR7',
    price: '200000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Yamarin',
    model: '79 Day Cruiser',
    price: '300000',
    personId: '3'
  }
]

const typeDefs = gql`
  type Person {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    people: [Person]
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
  }
`

const resolvers = {
  Query: {
    people: () => people
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      people.push(newPerson)
      return newPerson
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id })
      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      person.firstName = args.firstName
      person.lastName = args.lastName
      return person
    },
    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id })
      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }
      remove(people, a => {
        return a.id === removedPerson.id
      })
      return removedPerson
    }
  }
}
export { typeDefs, resolvers }
