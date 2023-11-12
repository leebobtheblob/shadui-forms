import React from "react";
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

export const editInput = () => {
  return (
    <>
      <FormField
        control={form.control}
        name="l4_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel> 계통</FormLabel>
            <FormControl>
              <Input placeholder="yourEmail@gmail.com" {...field} readOnly />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
