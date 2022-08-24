import React from "react";
import { Card, Typography } from "antd";
import classes from "../UI/ItemCard.module.css";

const { Text } = Typography;

const DeliveredTasksItem: React.FC<{
    title: string;
    description: string;
    date: number;
    status: boolean;
    from: string;
    to: string;
}> = (props) => {
    return (
          <Card hoverable className={classes.item_card} title={props.title}>
              <p>{props.description}</p>
              <Text strong underline>
                  <p>To: {props.to}</p>
              </Text>
              <Text italic>
                  Created at: {new Date(props.date).toLocaleDateString("en-US")}
              </Text>
          </Card>
    );
};

export default DeliveredTasksItem;