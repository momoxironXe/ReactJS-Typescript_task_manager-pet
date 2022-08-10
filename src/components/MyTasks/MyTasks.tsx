import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-models";
import { fetchMyTasks, tasksActions } from "../../store/tasks";
import MyTaskItems from "./MyTaskItems";
import { Empty, Row } from "antd";
import { Task } from "../../models";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const MyTasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);
  const myTasks = useAppSelector((state) => state.tasks.myTasks);

  const changeMyTaskStatusHandler = async (task: Task) => {
    console.log(task);
    const newTasks = myTasks.filter((item) => item.data !== task.data);
    newTasks.push({ ...task, status: !task.status });
    dispatch(tasksActions.putNewMyTasks({ newTasks }));
    const currUser = doc(db, "users", uid);

    await updateDoc(currUser, {
      tasks: newTasks,
    });
  };

  const deleteMyTaskHandler = async (task: Task) => {
    console.log(task);
    const newTasks = myTasks.filter((item) => item.data !== task.data);
    dispatch(tasksActions.putNewMyTasks({ newTasks }));
    const currUser = doc(db, "users", uid);

    await updateDoc(currUser, {
      tasks: newTasks,
    });
  };

  useEffect(() => {
    dispatch(fetchMyTasks(uid));
  }, [dispatch]);

  return (
    <>
      {myTasks.length > 0 ? (
        <Row gutter={50}>
          <MyTaskItems
            tasks={myTasks}
            onDeleteTask={deleteMyTaskHandler}
            onChangeTaskStatus={changeMyTaskStatusHandler}
          />
        </Row>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default MyTasks;
