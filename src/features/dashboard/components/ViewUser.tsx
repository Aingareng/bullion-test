import { Avatar, AvatarImage } from "@/shared/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import BullionImg from "@/assets/bullion-ecosystem.png";
import DialogContent from "@/shared/components/molecules/DialogContent";
import { Button } from "@/shared/components/ui/button";

export default function ViewUser() {
  return (
    <DialogContent title="Lihat Users" className="w-[464px]">
      <Card className="shadow-none border-none">
        <CardHeader className="flex items-center justify-center">
          <Avatar className="w-[112px] h-[112px]">
            <AvatarImage src={BullionImg} alt="user-image" />
          </Avatar>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <section className="grid gap-1.5">
              <h5 className="font-bold">Nama Depan</h5>
              <p className="text-sm">Fahri</p>
            </section>
            <section className="grid gap-1.5">
              <h5 className="font-bold">Nama Belakang</h5>
              <p className="text-sm">Ngareng</p>
            </section>
            <section className="grid gap-1.5">
              <h5 className="font-bold">Jenis Kelamin</h5>
              <p className="text-sm">Laki-laki</p>
            </section>
            <section className="grid gap-1.5">
              <h5 className="font-bold">Tanggal Lahir</h5>
              <p className="text-sm">1 Januari 1999</p>
            </section>
          </div>

          <section className="grid gap-1.5">
            <h5 className="font-bold">No.Handphone</h5>
            <p className="text-sm">082260279005</p>
          </section>
          <section className="grid gap-1.5">
            <h5 className="font-bold">Email</h5>
            <p className="text-sm">ngarengai@gmail.com</p>
          </section>
          <section className="grid gap-1.5">
            <h5 className="font-bold">Alamat</h5>
            <p className="text-sm">Jl. Perjuangan No.45</p>
          </section>
        </CardContent>
        <CardFooter>
          <Button type="button" className="w-full cursor-pointer">
            Edit
          </Button>
        </CardFooter>
      </Card>
    </DialogContent>
  );
}
