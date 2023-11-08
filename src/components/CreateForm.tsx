"use client";

import * as React from "react";
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
  acqYear: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),

  type: z.string({ required_error: "관종을 선택해주세요" }),
});
export function CreateForm() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
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
            <FormItem className="flex flex-col">
              <FormLabel>관종</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? pipe_types.find(
                            (pipe_type) => pipe_type.value === field.value
                          )?.label
                        : "관로 종류를 선택하세요"}
                      {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty> 존재하지 않는 관종입니다</CommandEmpty>
                    <CommandGroup>
                      {pipe_types.map((pipe_type) => (
                        <CommandItem
                          value={pipe_type.label}
                          key={pipe_type.value}
                          onSelect={() => {
                            form.setValue("type", pipe_type.value);
                          }}
                        >
                          {pipe_type.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
