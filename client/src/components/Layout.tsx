import { Col } from "antd"
import React from "react"

type LayoutVariant = "small" | "regular"
interface LayoutProps {
  variant?: LayoutVariant
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", justifyContent: "center" }}
    >
      <Col xs={24} sm={22} md={16}>
        {children}
      </Col>
    </div>
  )
}
