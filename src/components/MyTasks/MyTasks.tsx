import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-models";
import { fetchMyTasks, tasksActions } from "../../store/tasks";
import MyTaskItems from "./MyTaskItems";
import { Row } from "antd";
import { Task } from "../../models";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const MyTasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);
  const myTasks = useAppSelector((state) => state.tasks.myTasks);
  const DUMMY_TASKS = [
    {
      title: "This is your first demo task",
      description: `Hello, . Do you like my app?`,
      data: new Date().getTime(),
      from: "admin",
      status: false,
    },
  ];

 const changeMyTaskStatusHandler = async (task: Task) => {
     console.log(task);
   const newTasks = myTasks.filter(item => item.data !== task.data);
     newTasks.push({...task, status: !task.status});
     dispatch(tasksActions.putNewMyTasks({ newTasks }));
     const currUser = doc(db, "users", uid);

     await updateDoc(currUser, {
         tasks: newTasks,
     });

 }

    const deleteMyTaskHandler = async (task: Task) => {
        console.log(task);
        const newTasks = myTasks.filter(item => item.data !== task.data);
        dispatch(tasksActions.putNewMyTasks({ newTasks }));
        const currUser = doc(db, "users", uid);

        await updateDoc(currUser, {
            tasks: newTasks,
        });

    }

  useEffect(() => {
    dispatch(fetchMyTasks(uid));
  }, [dispatch]);

  return (
    <Row>
      <MyTaskItems tasks={myTasks} onDeleteMyTask={deleteMyTaskHandler} onChangeMyTaskStatus={changeMyTaskStatusHandler} />
    </Row>
  );
};

export default MyTasks;
