"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  inst_address: z.string().min(2, {
    message: "inst_address must be at least 2 characters.",
  }),
  l4_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  acqYear: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),

  type: z.string().min(1),
});
export function CreateForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inst_address: "",
      l4_name: "",
      acqYear: "",
      type: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2"
      >
        <FormField
          control={form.control}
          name="inst_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설치주소</FormLabel>
              <FormControl>
                <Input placeholder="현재 설치 주소 입력" {...field} disabled />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="l4_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 계통</FormLabel>
              <FormControl>
                <Input placeholder="yourEmail@gmail.com" {...field} readOnly />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acqYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 사업장</FormLabel>
              <FormControl>
                <Input placeholder="yourEmail@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 사업장</FormLabel>
              <FormControl>
                <Input placeholder="yourEmail@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
