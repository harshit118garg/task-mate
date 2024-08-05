import { Task } from "./types";
import * as Yup from "yup";

export const InputAppDefaultValues: Task = {
  title: "",
  description: "",
  priority: "",
};

export const InputAppValidationSchema = Yup.object({
  title: Yup.string().required("Task Title is Required"),
  priority: Yup.string().required("Please select a priority"),
  description: Yup.string().required("Task Description is Required"),
});
