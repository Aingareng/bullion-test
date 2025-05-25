import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email tidak boleh kosong")
    .email("Email tidak valid"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});
export const registerScema = z
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
      .nonempty("Kata sandi wajib diisi")
      .min(8, "Kata sandi minimal 8 karakter")
      .max(100, "Kata sandi maksimal 100 karakter")
      .regex(/[a-z]/, "Harus mengandung huruf kecil")
      .regex(/[A-Z]/, "Harus mengandung huruf besar")
      .regex(/[0-9]/, "Harus mengandung angka")
      .regex(/[^A-Za-z0-9]/, "Harus mengandung simbol")
      .refine(
        (val) => !/\s/.test(val),
        "Kata sandi tidak boleh mengandung spasi"
      ),
    confirm_password: z
      .string()
      .nonempty("Konfirmasi password wajib diisi")
      .min(8, "Konfirmasi password minimal 8 karakter"),
    address: z.string().nonempty("Alamat tidak boleh kosong"),
    phone: z
      .string()
      .nonempty("Nomor telepon tidak boleh kosong")
      .regex(/^\+?[0-9]{10,15}$/, "Nomor telepon tidak valid"),
    photo: z.custom<File>((val) => val instanceof File, {
      message: "File foto tidak valid",
    }),
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
