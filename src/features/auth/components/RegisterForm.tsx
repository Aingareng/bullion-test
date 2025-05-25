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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { registerScema } from "../utils/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/shared/components/ui/select";

import Popover from "@/shared/components/molecules/Popover";
import { CalendarDays, CloudUpload, Eye } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { cn } from "@/shared/libs/utils";
import { formatTanggalIndonesia } from "@/shared/utils/formatDate";
import useAuth from "../hooks/useAuth";
import objectToFormData from "@/shared/utils/objectToFormData";

export default function RegisterForm() {
  const { isPending, registerMutation } = useAuth();
  const form = useForm<z.infer<typeof registerScema>>({
    resolver: zodResolver(registerScema),
    defaultValues: {
      email: "",
      password: "",
      address: "",
      phone: "",
      date_of_birth: undefined,
      confirm_password: "",
      first_name: "",
      gender: "",
      last_name: "",
      photo: undefined as File | undefined,
    },
  });

  function onSubmit(data: z.infer<typeof registerScema>) {
    console.log(data.photo as File);
    const payload = objectToFormData({
      ...data,
      gender: data.gender as GenderType,
      date_of_birth: data.date_of_birth ?? "",
    });
    registerMutation(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-max">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Depan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukan nama depan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Belakang</FormLabel>
                <FormControl>
                  <Input placeholder="Masukan nama belakang" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={`border p-[0.3em_1.2em] rounded-md text-left font-normal w-full text-muted-foreground cursor-pointer ${
                        form.formState.errors.gender
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Lahir</FormLabel>
                <Popover
                  FormControl={
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " pl-3 text-left font-normal cursor-pointer",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          formatTanggalIndonesia(field.value.toString())
                        ) : (
                          <span>Pilih tanggal lahir</span>
                        )}
                        <CalendarDays className="ml-auto h-4 w-4 text-primary" />
                      </Button>
                    </FormControl>
                  }
                >
                  <Calendar
                    captionLayout="dropdown"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Masukan email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No.Handphone</FormLabel>
              <FormControl>
                <Input placeholder="Masukan no handphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input placeholder="Masukan alamat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata Sandi</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukan password"
                    {...field}
                    icon={<Eye size={18} className="text-primary" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukan konfirmasi password"
                    {...field}
                    icon={<Eye size={18} className="text-primary" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto Profil</FormLabel>
              <FormControl className="cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                  icon={<CloudUpload size={18} className="text-primary" />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          variant="register"
          disabled={isPending}
        >
          Tambah
        </Button>
      </form>
    </Form>
  );
}
