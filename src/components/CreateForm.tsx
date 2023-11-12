"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import { format } from "date-fns";

const pipe_types = [
  { value: "1", label: "one" },
  { value: "2", label: "two" },
  { value: "3", label: "three" },
  { value: "4", label: "four" },
  { value: "5", label: "five" },
];

const formSchema = z.object({
  inst_address: z.string().min(2, {
    message: "inst_address must be at least 2 characters.",
  }),
  l4_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  install_date: z.date({
    required_error: "설치일자를 선택해주세요",
  }),

  type: z.string({ required_error: "관종을 선택해주세요" }),
});
export function CreateForm() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [formMode, setFormMode] = useState("read");

  useEffect(() => {
    console.log(formMode);
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.\
    // debugger;
    toast({
      title: " Registered value",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    //console.log("hello");
  }
  return (
    <>
      {/* {formMode === "read" ? (
        <Button
          onClick={() => {
            setFormMode("edit");
          }}
        >
          edit{" "}
        </Button>
      ) : (
        <Button onClick={() => setFormMode("read")}> read</Button>
      )} */}

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
                  <Input
                    placeholder="현재 설치 주소 입력"
                    {...field}
                    className="secondary"
                  />
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
            name="install_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
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
                <FormLabel>관종 2</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="해당 되는 관종을 선택하세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="t01">type 1</SelectItem>
                    <SelectItem value="t02">type 2</SelectItem>
                    <SelectItem value="t03">type 3</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  두가지 방법으로 관종을 표시할수 있다.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
