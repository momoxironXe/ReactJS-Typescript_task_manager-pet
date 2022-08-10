import React from "react";

const TasksPage = React.lazy(() => import("../pages/panel/TasksPage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const DeliveredTasksPage = React.lazy(() => import("../pages/panel/DeliveredTasksPage"));
const CreateNewTaskPage = React.lazy(() => import("../pages/panel/CreateNewTaskPage"));

export interface Route {
  path: string;
  element: React.FC;
}

export const privateRoutes: Route[] = [
  {
    path: "/tasks",
    element: TasksPage,
  },
  {
    path: "/delivered-tasks",
    element: DeliveredTasksPage,
  },
  {
    path: "/create-task",
    element: CreateNewTaskPage,
  },
];

export const publicRoutes: Route[] = [
  {
    path: "/login",
    element: LoginPage ,
  },
];
