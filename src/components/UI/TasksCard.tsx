import { Col } from "antd";
import React from "react";
import Title from "antd/lib/typography/Title";
import classes from "./TasksCard.module.css";

const TasksCard: React.FC<{ children: React.ReactNode, cardsTitle: string }> = (props) => {
    return (
          <Col
            xs={24}
            lg={12}
            className={classes.tasks_card}
          >
              <Title level={3}>{props.cardsTitle}</Title>
              {props.children}
          </Col>
    );
};

export default TasksCard;