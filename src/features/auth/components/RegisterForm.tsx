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
import { CalendarDays, CloudUpload, Eye, EyeClosed } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { cn } from "@/shared/libs/utils";
import { formatTanggalIndonesia } from "@/shared/utils/formatDate";
import useAuth from "../hooks/useAuth";
import objectToFormData from "@/shared/utils/objectToFormData";
import { useLocation, useNavigate } from "react-router-dom";
import type { GenderType } from "../types/auth";
import useUser from "@/features/dashboard/hooks/useUser";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHook";
import type { TypeUserUpdatePayload } from "@/features/dashboard/types/dashboard";
import { useEffect, useState } from "react";
import splitFullName from "@/shared/utils/splitFullName";
import { fileToBase64 } from "@/shared/utils/uploadFileConverter";
import { useFileInput } from "@/shared/hooks/useFileInput";
import { UpdateUserSchema } from "@/features/dashboard/utils/schema";
import { HTTP_STATUS_CODE } from "@/shared/types/apiResponse";
import { toast } from "sonner";
import { closeDialog } from "@/features/dashboard/stores/dialogStore";

export default function RegisterForm() {
  const { pathname } = useLocation();
  const isRegisterPage = pathname.startsWith("/register");
  const { isPending, registerMutation } = useAuth();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((s) => s.users.user);
  const { updateUser, isPendingMutation } = useUser(undefined, false);
  const {
    fileName: selectedPhotoName,
    // previewUrl,
    handleChange: handlePreviewUpdate,
    setFileName,
  } = useFileInput();

  const formSchema = isRegisterPage ? registerScema : UpdateUserSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      address: "",
      phone: "",
      date_of_birth: undefined,
      confirm_password: "",
      first_name: "",
      gender: !isRegisterPage ? user?.gender : undefined,
      last_name: "",
      photo: undefined as File | undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (isRegisterPage) {
      const payload = objectToFormData({
        ...data,
        gender: data.gender as GenderType,
        date_of_birth: new Date(data.date_of_birth).toISOString() || "",
      });
      const response = await registerMutation(payload);

      if (response && response.status === HTTP_STATUS_CODE.OK) {
        toast("Pendaftaran berhasil, silakan masuk");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast(response.message || "Pendaftaran gagal");
      }
    } else {
      const photo = data.photo ? await fileToBase64(data.photo as File) : "";
      const updatePayload: TypeUserUpdatePayload = {
        address: data.address,
        date_of_birth: new Date(data.date_of_birth).toISOString() || "",
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender as GenderType,
        phone: data.phone,
        ...(data.password && {
          password: data.password,
        }),
        ...(data.photo && {
          photo,
        }),
      };

      const response = await updateUser({
        id: user?._id ?? "",
        payload: updatePayload,
      });

      if (response && response.status === HTTP_STATUS_CODE.OK) {
        toast("Data berhasil diperbarui");
        dispatch(closeDialog());
      }
    }
  }

  useEffect(() => {
    if (!isRegisterPage && user) {
      setFileName(user.photo ? "Foto lama tersedia" : "");

      const { firstName, lastName } = splitFullName(user.name);
      form.reset({
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        date_of_birth: user.date_of_birth
          ? new Date(user.date_of_birth)
          : undefined,
        confirm_password: "",
        password: "",
        first_name: firstName || "",
        last_name: lastName || "",
        gender: user.gender || "male",
        photo: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterPage, user, form]);

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
  let confirmPwdIcon = (
    <Eye
      size={18}
      className="text-primary"
      onClick={() => setShowConfirm((prev) => !prev)}
    />
  );

  if (showConfirm) {
    confirmPwdIcon = (
      <EyeClosed
        size={18}
        className="text-primary"
        onClick={() => setShowConfirm((prev) => !prev)}
      />
    );
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
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata Sandi</FormLabel>
                <FormControl>
                  <Input
                    type={showPwd ? "text" : "password"}
                    placeholder="Masukan password"
                    {...field}
                    icon={passwordIcon}
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
                    type={showPwd ? "text" : "password"}
                    placeholder="Masukan konfirmasi password"
                    {...field}
                    icon={confirmPwdIcon}
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
                  placeholder={selectedPhotoName || "Pilih file"}
                  icon={<CloudUpload size={18} className="text-primary" />}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file); // update form value
                      handlePreviewUpdate(file); // update UI preview
                    }
                  }}
                />
              </FormControl>
              {/* {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-24 h-24 mt-2 rounded-md object-cover"
                />
              )} */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          variant={isRegisterPage ? "register" : "default"}
          disabled={isRegisterPage ? isPending : isPendingMutation}
        >
          {isRegisterPage ? "Tambah" : "Simpan"}
        </Button>
      </form>
    </Form>
  );
}
