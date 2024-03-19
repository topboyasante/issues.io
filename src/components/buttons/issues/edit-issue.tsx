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
import { Textarea } from "@/components/ui/textarea";
import { editIssue, getIssueById } from "@/services/issues";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title should be more than 1 character",
  }),
  description: z.string().min(1, {
    message: "Description should be more than 1 character",
  }),
});

export default function EditIssue({
  issue_id,
  project_id,
}: {
  issue_id: string;
  project_id: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description:""
    },
  });
  useEffect(() => {
    async function fetchData() {
      const response = await getIssueById(issue_id);
      return response;
    }

    fetchData()
      .then((response) => {
        if (response) {
          form.reset({
            title: response.title,
            description:response.description
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [issue_id, form.reset, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      editIssue({
        ...values,
        issue_id,
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
        <Button size={`icon`} variant={`secondary`}>
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Issue</DialogTitle>
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
                 <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the task/issue"
                      className="resize-none"
                      {...field}
                    />
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
