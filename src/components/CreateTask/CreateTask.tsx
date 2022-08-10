import React from "react";
import { Button, Form, Input, InputRef, Modal, Select } from "antd";
import { useState, useRef } from "react";
import { useAppSelector } from "../../hooks/redux-models";
import { Task, User, deliveredTask } from "../../models";
import { TextAreaRef } from "antd/es/input/TextArea";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";

const { TextArea } = Input;
const { Option } = Select;

const CreateTask: React.FC = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedToValue, setSelectedToValue] = useState<string | null>(null);
    const usersList = useAppSelector(state => state.users.users);
    const currentUserId = useAppSelector(state => state.auth.uid);
    const currentUserEmail = useAppSelector(state => state.auth.email)

    const titleInputRef = useRef<InputRef>(null);
    const descriptionTextareaRef = useRef<TextAreaRef>(null);

    const selectChangeHandler = (value: string) => {
        setSelectedToValue(value);
        console.log(value);
    }

    const openFormHandler = () => {
        setOpenForm(true);
    };

    const closeFormHandler = () => {
        setOpenForm(false)
    }

    const submitHandler = async (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        const titleInputValue = titleInputRef.current!.input!.value;
        const descriptionTextareaValue = descriptionTextareaRef.current!.resizableTextArea!.textArea.value;
        const emailToDeliver = usersList.find(elem => elem.uid === selectedToValue);
        const newTask: Task = {
            title: titleInputValue,
            description: descriptionTextareaValue,
            data: new Date().getTime(),
            from: currentUserEmail,
            to: emailToDeliver!.email,
            status: false,
        }
        const userToDeliver = doc(db, "users", selectedToValue!);
        await updateDoc(userToDeliver, {
            tasks: arrayUnion(newTask)
        });
        const userWhoDeliver = doc(db, "users", currentUserId);
        await updateDoc(userWhoDeliver, {
            deliveredTasks: arrayUnion(newTask)
        });
        setLoading(false);
        setOpenForm(false);
    }

    return (
      <>
          <Button onClick={openFormHandler} type="primary">
              Create Task
          </Button>
          <Modal
            visible={openForm}
            title="Create new Task"
            onOk={submitHandler}
            onCancel={closeFormHandler}
            footer={[
                <Button key="cancel" onClick={closeFormHandler}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" htmlType="submit" loading={loading} onClick={submitHandler}>
                    Submit
                </Button>
            ]}
          >
              <Form>
                  <Form.Item label="Title">
                      <Input ref={titleInputRef} />
                  </Form.Item>
                  <Form.Item label="Description">
                      <TextArea ref={descriptionTextareaRef} />
                  </Form.Item>
                  <Form.Item label="To: ">
                      <Select
                        placeholder="Select a user"
                        allowClear
                        onChange={selectChangeHandler}
                      >
                          {usersList.map(item => (
                            <Option key={item.uid} value={item.uid}>{item.email}</Option>
                          ))}
                      </Select>
                  </Form.Item>
              </Form>
          </Modal>
      </>
    );
};

export default CreateTask;