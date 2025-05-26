import { Avatar, AvatarImage } from "@/shared/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import DialogContent from "@/shared/components/molecules/DialogContent";
import { Button } from "@/shared/components/ui/button";
import { useAppSelector } from "@/shared/hooks/reduxHook";
import splitFullName from "@/shared/utils/splitFullName";
import { formatTanggalIndonesia } from "@/shared/utils/formatDate";
import { convertBase64ToImage } from "@/shared/utils/convertBase64ToImage";

interface IProps {
  onEditClick: () => void;
}

export default function ViewUser({ onEditClick }: IProps) {
  const user = useAppSelector((s) => s.users.user);

  const { firstName, lastName } = splitFullName(user?.name ?? "");

  return (
    <DialogContent title="Lihat Users" className="w-[464px]">
      <Card className="shadow-none border-none">
        <CardHeader className="flex items-center justify-center">
          <Avatar className="w-[112px] h-[112px]">
            <AvatarImage
              src={convertBase64ToImage(user?.photo ?? "")}
              alt="user-image"
            />
          </Avatar>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <section className="grid gap-1.5">
              <h5 className="font-bold">Nama Depan</h5>
              <p className="text-sm">{firstName}</p>
            </section>
            <section className="grid gap-1.5">
              <h5 className="font-bold">Nama Belakang</h5>
              <p className="text-sm">{lastName}</p>
            </section>
            <section className="grid gap-1.5">
              <h5 className="font-bold">Jenis Kelamin</h5>
              <p className="text-sm">{user?.gender}</p>
            </section>
            <section className="grid gap-1.5">
              <h5 className="font-bold">Tanggal Lahir</h5>
              <p className="text-sm">
                {formatTanggalIndonesia(user?.date_of_birth ?? "")}
              </p>
            </section>
          </div>

          <section className="grid gap-1.5">
            <h5 className="font-bold">No.Handphone</h5>
            <p className="text-sm">{user?.phone}</p>
          </section>
          <section className="grid gap-1.5">
            <h5 className="font-bold">Email</h5>
            <p className="text-sm">{user?.email}</p>
          </section>
          <section className="grid gap-1.5">
            <h5 className="font-bold">Alamat</h5>
            <p className="text-sm">{user?.address}</p>
          </section>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            className="w-full cursor-pointer"
            onClick={onEditClick}
          >
            Edit
          </Button>
        </CardFooter>
      </Card>
    </DialogContent>
  );
}
