import RegisterForm from "@/features/auth/components/RegisterForm";
import DialogContent from "@/shared/components/molecules/DialogContent";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

export default function EditUser() {
  return (
    <DialogContent title="Edit User" className="w-max">
      <ScrollArea className="h-[579px] w-full">
        <Card className="shadow-none border-none">
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </ScrollArea>
    </DialogContent>
  );
}
