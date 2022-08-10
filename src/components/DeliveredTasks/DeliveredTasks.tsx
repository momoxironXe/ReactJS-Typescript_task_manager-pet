import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-models";
import { fetchUsers } from "../../store/users";
import { fetchDeliveredTasks, tasksActions } from "../../store/tasks";
import DeliveredTasksItems from "./DeliveredTasksItems";
import { Empty } from "antd";
import Loading from "../UI/Loading";

const DeliveredTasks: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const uid = useAppSelector(state => state.auth.uid);
  const deliveredTasks = useAppSelector(state => state.tasks.deliveredTasks);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDeliveredTasks(uid))
  }, [dispatch]);

  return (
    <>
    {deliveredTasks.length > 0 ? <DeliveredTasksItems tasks={deliveredTasks} /> : <Empty />}
    </>
  );
};

export default DeliveredTasks;