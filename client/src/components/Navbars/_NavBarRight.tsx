import { NavLink, useHistory } from "react-router-dom"
import React, { useReducer } from "react"
import { useLogoutMutation, useMeQuery } from "../../generated/graphql"

import { Menu } from "antd"
import { useApolloClient } from "@apollo/client"

interface NavBarProps {}

export const RightMenu: React.FC<NavBarProps> = (props: any) => {
  const client = useApolloClient()
  const history = useHistory()
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const handleLogout = async () => {
    await logout()
    await client.resetStore()
    history.push("/login")
  }

  if (!data?.me) {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <NavLink to="/login">Log In</NavLink>
        </Menu.Item>
        <Menu.Item key="app">
          <NavLink to="/register">Sign Up</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <Menu mode="horizontal">
      <Menu.Item key="app">
        <NavLink to="#" onClick={handleLogout}>
          Log Out
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}
