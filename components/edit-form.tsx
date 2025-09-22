"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createNote } from "@/app/server/note.action";
import { toast } from "sonner";
import { noteSchema as noteFormSchema } from "@/lib/schema";

import React, { useEffect } from "react";
import { useUpdateNoteMutation } from "@/lib/mutations/userUpdateNoteMutation";

type Note = {
  id: string;
  title: string;
  body: string;
};

export const EditForm = ({ note }: { note: Note | null }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: note?.title ?? "",
      body: note?.body ?? "",
    },
  });

  useEffect(() => {
    if (note) {
      form.reset({
        title: note.title,
        body: note.body,
      });
    }
  }, [note, form]);

  const { mutate: updateNoteMutation, isPending } = useUpdateNoteMutation();
  function onSubmit(values: z.infer<typeof noteFormSchema>) {
    if (!note) return;
    updateNoteMutation({ id: note?.id, ...values });
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="text-blue-500 text-sm p-2 text-left rounded-sm hover:text-black transition-colors duration-200 ease-in-out hover:bg-gray-100 ">
          Edit
        </div>
      </DialogTrigger>
      {/* Hidden button to close dialog programmatically */}
      <DialogClose id="close-dialog" className="hidden" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
          <DialogDescription>
            Make changes to your note here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter note title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write your note description here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
