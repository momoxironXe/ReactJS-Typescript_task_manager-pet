import React from "react";
import DeliveredTasksItem from "./DeliveredTasksItem";
import { Task } from "../../models";
import { Col, Row } from "antd";

const DeliveredTasksItems: React.FC<{ tasks: Task[] }> = (props) => {
  return (
    <Row gutter={16}>
      {props.tasks.map((item) => (
        <Col xs={24} lg={6}>
          <DeliveredTasksItem
            status={item.status}
            title={item.title}
            date={item.data}
            description={item.description}
            key={item.data}
            from={item.from}
            to={item.to}
          />
        </Col>
      ))}
    </Row>
  );
};

export default DeliveredTasksItems;
