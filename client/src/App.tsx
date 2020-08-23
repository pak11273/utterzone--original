import "./less/index.less"

import { Layout, NavbarMain } from "./components"

import { ApolloProvider } from "@apollo/client"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { client } from "./apollo"
import { routes } from "./routes"

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <NavbarMain />
          <div>{routes}</div>
        </Layout>
      </Router>
    </ApolloProvider>
  )
}

export default App
