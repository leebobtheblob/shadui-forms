"use client";
import { useForm } from "react-hook-form";
import Input from "@/components/InputComponents";
export const NewTodoForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form-title">Create a new Todo</h1>{" "}
      <Input
        type="text"
        name="title"
        label="Todo (e.g do laundry)"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Todo text is required",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
        }}
        required
      />{" "}
      <Input
        type="date"
        name="date"
        label="Due Date"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Todo deadline is required",
        }}
        required
      />{" "}
      <input type="submit" />
    </form>
  );
};
