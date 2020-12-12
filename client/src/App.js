import React from 'react'
import {BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'

import { Layout } from 'antd'
import AddPerson from './components/forms/AddPerson'

import './App.css'
import  People  from './components/lists/People'
import BoatsByPerson from './components/lists/BoatsByPerson'
import AddBoat from "./components/forms/AddBoat";

const { Content } = Layout

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='container'>

        <BrowserRouter >

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>

                <Route path="/person/:id/" exact >
                    <Content className='App'>
                        <Title />
                        <AddBoat/>
                        <BoatsByPerson />
                    </Content>
                </Route>
                <Route path="/" exact >
                    <Content className='App'>
                        <Title />
                        <AddPerson />
                        <People />
                    </Content>
                </Route>

            </Switch>

        </BrowserRouter>

    </div>
  </ApolloProvider>
)

export default App
