import TasksPage from "../pages/panel/TasksPage";
import React from "react";
import LoginPage from "../pages/LoginPage";

export interface Route {
  path: string;
  element: React.FC;
}

export const privateRoutes: Route[] = [
  {
    path: "/tasks",
    element: TasksPage,
  },
];

export const publicRoutes: Route[] = [
  {
    path: "/login",
    element: LoginPage ,
  },
];
