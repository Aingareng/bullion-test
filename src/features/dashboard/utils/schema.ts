import { z } from "zod";

export const UpdateUserSchema = z
  .object({
    first_name: z.string().nonempty("Nama depan tidak boleh kosong"),
    last_name: z.string().nonempty("Nama belakang tidak boleh kosong"),
    email: z
      .string()
      .nonempty("Email tidak boleh kosong")
      .email("Email tidak valid"),
    gender: z.string().nonempty("Jenis kelamin tidak boleh kosong"),
    date_of_birth: z
      .date({
        invalid_type_error: "Tanggal lahir tidak valid",
        required_error: "Tanggal lahir wajib diisi",
      })
      .refine((val) => new Date(val) <= new Date(), {
        message: "Tanggal lahir tidak boleh di masa depan",
      }),
    // z.string().nonempty("Tanggal lahir tidak boleh kosong"),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Kata sandi minimal 8 karakter",
      })
      .refine((val) => !val || val.length <= 100, {
        message: "Kata sandi maksimal 100 karakter",
      })
      .refine((val) => !val || /[a-z]/.test(val), {
        message: "Harus mengandung huruf kecil",
      })
      .refine((val) => !val || /[A-Z]/.test(val), {
        message: "Harus mengandung huruf besar",
      })
      .refine((val) => !val || /[0-9]/.test(val), {
        message: "Harus mengandung angka",
      })
      .refine((val) => !val || /[^A-Za-z0-9]/.test(val), {
        message: "Harus mengandung simbol",
      })
      .refine((val) => !val || !/\s/.test(val), {
        message: "Kata sandi tidak boleh mengandung spasi",
      }),
    confirm_password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Kata sandi minimal 8 karakter",
      }),
    address: z.string().nonempty("Alamat tidak boleh kosong"),
    phone: z
      .string()
      .nonempty("Nomor telepon tidak boleh kosong")
      .regex(/^\+?[0-9]{10,15}$/, "Nomor telepon tidak valid"),
    photo: z
      .custom<File>((val) => val instanceof File, {
        message: "File foto tidak valid",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.confirm_password !== data.password) {
      ctx.addIssue({
        path: ["confirm_password"],
        message: "Konfirmasi password harus sama dengan password",
        code: "custom",
      });
    }
  });
