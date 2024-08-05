import { useCallback, useState } from "react";
import { Task } from "../../definations/types";
import { wait } from "../../helpers/util";
import {
  Button,
  DropdownField,
  DropdownOption,
  InputField,
} from "../../shared";
import { useTaskMateActions } from "../../state/task-mate";
import styles from "./index.module.scss";
import * as Yup from "yup";
import {
  InputAppDefaultValues,
  InputAppValidationSchema,
} from "../../definations/constants";

export default function InputApp() {
  const { addTask } = useTaskMateActions();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [task, setTask] = useState<Task>(InputAppDefaultValues);

  const [errorMessages, setErrorMessages] = useState(InputAppDefaultValues);

  const handleOnChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = event.target;
      setTask((prevTask) => ({ ...prevTask, [name]: value }));
    },
    []
  );

  const handleBlur = (
    event: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const isErrorField = event.target.dataset.errorfield! === "true";
    if (value && isErrorField) {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        [name]: "",
      }));
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const newTask: Task = {
          title: task.title,
          description: task.description,
          priority: task.priority,
        };
        setIsLoading(true);
        await InputAppValidationSchema.validate(newTask, {
          abortEarly: false,
        });
        wait(1000, () => {
          addTask(newTask);
          setIsLoading(false);
        });
        setTask(InputAppDefaultValues);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setIsLoading(true);
          const newErrorMessages = error.inner.reduce((acc, err) => {
            return { ...acc, [`${err.path}`]: err.message };
          }, InputAppDefaultValues);
          setIsLoading(false);
          setErrorMessages(newErrorMessages);
        }
      }
    },
    [task, addTask, InputAppValidationSchema]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.inputAppContainer}>
      <InputField
        name="title"
        onChange={handleOnChange}
        value={task.title}
        errorMessage={errorMessages.title}
        onBlur={handleBlur}
      />
      <DropdownField
        label="Select Priority"
        name="priority"
        value={task.priority}
        handleChange={handleOnChange}
        onBlur={handleBlur}
        errorMessage={errorMessages.priority}
      >
        <DropdownOption value="p1" label="p1" />
        <DropdownOption value="p2" label="p2" />
        <DropdownOption value="p3" label="p3" />
      </DropdownField>
      <InputField
        name="description"
        onChange={handleOnChange}
        textarea
        value={task.description}
        errorMessage={errorMessages.description}
        onBlur={handleBlur}
      />
      <Button fullHeight disabled={isLoading}>
        {isLoading ? <span>Loading...</span> : <span>Submit</span>}
      </Button>
    </form>
  );
}
