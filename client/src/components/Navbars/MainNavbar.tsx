// ref:  https://github.com/Rupinderthind/Ant_design_navbar

import React, { useState } from "react"

import { Drawer } from "antd"
import { Hamburger } from "../Buttons"
import { LeftMenu } from "./_NavBarLeft"
import { Link } from "react-router-dom"
import { RightMenu } from "./_NavBarRight"

// import { useLogoutMutation, useMeQuery } from "../generated/graphql"
export const MainNavbar = () => {
  const [state, changeState] = useState({
    current: "mail",
    visible: false,
  })

  const ChangeState = () => {
    changeState({
      ...state,
      visible: true,
    })
  }
  const OnClose = () => {
    changeState({
      ...state,
      visible: false,
    })
  }
  return (
    <nav className="menuBar">
      <div className="logo">
        <Link to="/">UZ</Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Hamburger changeState={ChangeState} />
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={true}
          onClose={OnClose}
          visible={state.visible}
        >
          {/* <LeftMenu /> */}
          {/* <RightMenu /> */}
        </Drawer>
      </div>
    </nav>
  )
}
