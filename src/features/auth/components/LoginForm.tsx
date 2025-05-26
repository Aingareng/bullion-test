import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import useAuth from "../hooks/useAuth";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { HTTP_STATUS_CODE } from "@/shared/types/apiResponse";
import { useNavigate } from "react-router-dom";
import localStorageUtils from "@/shared/utils/storage";
import type { ILoginData } from "../types/auth";
import { toast } from "sonner";

export default function LoginForm() {
  const { loginMutation, isPending } = useAuth();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value: z.infer<typeof loginSchema>) {
    const result = await loginMutation(value);

    if (result && result.status === HTTP_STATUS_CODE.OK) {
      localStorageUtils.set<ILoginData>("USER", result.data);
      toast("Berhasil masuk");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast(result.message || "Gagal masuk");
    }
  }

  let passwordIcon = (
    <Eye
      size={18}
      className="text-primary"
      onClick={() => setShowPwd((prev) => !prev)}
    />
  );

  if (showPwd) {
    passwordIcon = (
      <EyeClosed
        size={18}
        className="text-primary"
        onClick={() => setShowPwd((prev) => !prev)}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="Masuka Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={showPwd ? "text" : "password"}
                  {...field}
                  placeholder="Masuka Password"
                  icon={passwordIcon}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Masuk
        </Button>
      </form>
    </Form>
  );
}
