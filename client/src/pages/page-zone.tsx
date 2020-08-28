import { Chat, Zone } from "../components"
import { Col, Row } from "antd"

import React from "react"

interface zoneProps {}

export const PageZone: React.FC<zoneProps> = () => {
  return (
    <div style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col
          className="zone-content"
          span={17}
          style={{ background: "green", height: "100%", overflow: "scroll" }}
        >
          <div style={{ minHeight: "600px" }}>
            <Zone />
          </div>
          <div style={{ background: "red", minHeight: "80%" }}>
            Zone Controls
          </div>
        </Col>
        <Col span={7} style={{ height: "100%" }}>
          <Chat />
        </Col>
      </Row>
    </div>
  )
}
