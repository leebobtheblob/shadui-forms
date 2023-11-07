import Image from "next/image";
import { NewTodoForm } from "@/components/SampleForm";
import { ProfileForm } from "@components/RHFwZod";
import { CreateForm, createForm } from "@components/CreateForm";
export default function Home() {
  return (
    <>
      <CreateForm></CreateForm>
    </>
  );
}
