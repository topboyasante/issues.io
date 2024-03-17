"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editList, getListById } from "@/services/lists";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title should be more than 1 character",
  }),
});

export default function EditList({
  list_id,
  project_id,
}: {
  list_id: number;
  project_id: number;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  useEffect(() => {
    async function fetchData() {
      const response = await getListById(list_id);
      return response;
    }

    fetchData()
      .then((response) => {
        if (response) {
          form.reset({
            title: response.title,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [list_id, form.reset, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      editList({
        ...values,
        list_id,
        project_id,
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="text-sm p-2 cursor-pointer hover:bg-accent w-full rounded-sm">
          Edit List
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit List</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center gap-5">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
