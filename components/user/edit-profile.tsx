"use client";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadProfileImageProps } from "@/types/auth";
import { editProfileFormSchema } from "@/lib/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateProfileMutation } from "@/lib/mutations/useEditProfileMutation";
import { Loader2 } from "lucide-react";

export const EditProfile = ({ user }: UploadProfileImageProps) => {
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    mode: "onChange",
  });

  const { isDirty } = form.formState;
  const { mutate: updateProfileMutate, isPending } = useUpdateProfileMutation();

  async function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
    // Only send the name field to the server
    updateProfileMutate({ name: values.name });
  }

  return (
    <Card className="w-[400px] h-[400px]">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Edit your account details here</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <CardContent className="space-y-7 flex-grow">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="text-muted-foreground bg-muted/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mt-auto">
            <Button
              type="submit"
              disabled={!isDirty || isPending}
              className={` transition-colors  ${
                !isDirty ? "bg-primary cursor-not-allowed" : ""
              }`}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" /> Submitting
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
