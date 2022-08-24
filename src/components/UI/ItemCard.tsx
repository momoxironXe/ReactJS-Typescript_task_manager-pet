import { Card, Badge, Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React, { ReactElement } from "react";
import classes from "./ItemCard.module.css";
import { Task } from "../../models";

const { Text } = Typography;

const ItemCard: React.FC<{
  title: string;
  description: string;
  badgeText: string;
  badgeColor: string;
  date: number;
  status: boolean;
  from: string;
  to: string;
  onChangeMyTaskStatus: (task: Task) => void;
  onDeleteMyTask: (task: Task) => void;
  statusIcon: ReactElement;
}> = (props) => {
  const changeStatusHandler = () => {
    props.onChangeMyTaskStatus({
      title: props.title,
      description: props.description,
      data: props.date,
      status: props.status,
      from: props.from,
      to: props.to
    });
  };

  const deleteTaskHandler = () => {
    props.onDeleteMyTask({
      title: props.title,
      description: props.description,
      data: props.date,
      status: props.status,
      from: props.from,
      to: props.to
    });
  };

  return (
    <Badge.Ribbon text={props.badgeText} color={props.badgeColor}>
      <Card hoverable className={classes.item_card} title={props.title}>
        <p>{props.description}</p>
        <Text strong underline>
          <p>From: {props.from}</p>
        </Text>
        <Text italic>
          Created at: {new Date(props.date).toLocaleDateString("en-US")}
        </Text>
        <div className={classes.button_section}>
          <Button
            className={classes.check_resolved}
            type="primary"
            onClick={changeStatusHandler}
            shape="circle"
            icon={props.statusIcon}
          />
          <Button
            type="primary"
            shape="circle"
            onClick={deleteTaskHandler}
            icon={<DeleteOutlined />}
          />
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default ItemCard;
