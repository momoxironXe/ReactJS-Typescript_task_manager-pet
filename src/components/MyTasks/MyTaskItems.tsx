import React from "react";
import { Task } from "../../models";
import TasksCard from "../UI/TasksCard";
import ItemCard from "../UI/ItemCard";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const MyTaskItems: React.FC<{
  tasks: Task[];
  onChangeTaskStatus: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}> = (props) => {
  const resolvedTasks = props.tasks.filter((item) => item.status);
  const newTasks = props.tasks.filter((item) => !item.status);

  return (
    <>
      <TasksCard cardsTitle="New Tasks">
        {newTasks &&
          newTasks.map((item) => (
            <ItemCard
              badgeColor="blue"
              badgeText="New"
              status={item.status}
              title={item.title}
              date={item.data}
              description={item.description}
              key={item.data}
              onChangeMyTaskStatus={props.onChangeTaskStatus}
              from={item.from}
              to={item.to}
              statusIcon={<CheckCircleOutlined />}
              onDeleteMyTask={props.onDeleteTask}
            />
          ))}
      </TasksCard>
      <TasksCard cardsTitle="Resolved Tasks">
        {resolvedTasks &&
          resolvedTasks.map((item) => (
            <ItemCard
              badgeColor="green"
              badgeText="Resolved"
              status={item.status}
              title={item.title}
              date={item.data}
              description={item.description}
              key={item.data}
              onChangeMyTaskStatus={props.onChangeTaskStatus}
              from={item.from}
              statusIcon={<CloseCircleOutlined />}
              onDeleteMyTask={props.onDeleteTask}
              to={item.to}
            />
          ))}
      </TasksCard>
    </>
  );
};

export default MyTaskItems;
