import { gql } from 'apollo-server-express'
import {filter, find, remove} from 'lodash'

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

  type Boat {
    id: String!
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
  }

  type Person {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    people: [Person]
    person(id: String!): Person
    boatsByPerson( personId: String! ):[Boat]
    boat( id: String! ): Boat
    boatsList : [Boat]
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
    
    addBoat(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Boat
    updateBoat(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Boat
    removeBoat(id: String!): Boat
    
  }
`

const resolvers = {
  Query: {
    people: () => people,
    person : (parent, args, context, info) => {
      return find(people, { id: args.id })
    },
    boatsByPerson : (parent, args, context, info) => {
      return filter(boats, { personId: args.personId })
    },
    boat : (parent, args, context, info) => {
      return find(boats, { id: args.id })
    },
    boatsList : () => boats
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
    },


    addBoat: (root, args) => {
      const newBoat = {
        id: args.id,
        year: args.year,
        model: args.model,
        make: args.make,
        price: args.price,
        personId: args.personId
      }
      boats.push(newBoat)
      return newBoat
    },
    updateBoat: (root, args) => {
      const boat = find(boats, { id: args.id })
      if (!boat) {
        throw new Error(`Couldn't find boat with id ${args.id}`)
      }

      boat.year = args.year
      boat.make = args.make
      boat.model = args.model
      boat.price = args.price
      boat.personId = args.personId
      return boat
    },
    removeBoat: (root, args) => {
      const removedBoat = find(boats, { id: args.id })
      if (!removedBoat) {
        throw new Error(`Couldn't find boat with id ${args.id}`)
      }
      remove(boats, a => {
        return a.id === removedBoat.id
      })
      return removedBoat
    }

  }
}
export { typeDefs, resolvers }
