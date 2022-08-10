import React, { useEffect } from "react";
import CreateTask from "./CreateTask";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-models";
import { fetchUsers } from "../../store/users";

const CreateNewTask: React.FC = () => {
    const dispatch = useAppDispatch();
    const uid = useAppSelector(state => state.auth.uid);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
          <CreateTask />
    );
};

export default CreateNewTask;