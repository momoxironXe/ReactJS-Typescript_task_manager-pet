export interface LoginFormType {
    email: string,
    password: string
}

export interface Task {
    title: string,
    description: string,
    data: number,
    from: string,
    status: boolean,
    to: string,
}

export interface deliveredTask {
    title: string,
    description: string,
    data: number,
    to: string,
    status: boolean,
}

export interface User {
    uid: string,
    email: string,
}