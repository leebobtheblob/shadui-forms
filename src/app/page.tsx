import Image from "next/image";
import { NewTodoForm } from "@/components/SampleForm";
import { ProfileForm } from "@components/RHFwZod";
import { CreateForm } from "@components/CreateForm";
export default function Home() {
  return (
    <>
      <h1 className="my-5 font-bold">자산 등록</h1>
      <CreateForm></CreateForm>
    </>
  );
}
