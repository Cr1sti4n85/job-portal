import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoggedUser } from "@/types/user";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import uploadFile from "@/lib/uploadFile";
import { toast } from "sonner";
import { useState } from "react";
import { updateUserProfile } from "@/actions/user";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  user: LoggedUser | null;
};

const UpdateProfile = ({ open, setOpen, user }: Props) => {
  const [profilePhoto, setProfilePhoto] = useState<string>(
    user?.profilePhoto || "",
  );
  const [profileResume, setProfileResume] = useState<string>(
    user?.profileResume || "",
  );

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const uploadedFile = await uploadFile(file);
    if (!uploadedFile) {
      toast.error("Error al subir imagen");
    } else {
      console.log("Uploaded file URL:", uploadedFile);

      toast.success("Archivo subido correctamente");
      if (type === "image") {
        setProfilePhoto(uploadedFile);
      } else {
        setProfileResume(uploadedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await updateUserProfile(formData, profilePhoto, profileResume);
    if (res.success) {
      toast.success(res.message);
      setOpen(false);
    } else {
      toast.error(res.message || "Error al actualizar perfil");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Realiza los cambios necesarios en tu perfil y luego guardalos para
            que se actualicen en tu cuenta.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={user?.fullName}
                placeholder="Ingresa tu nombre"
              />
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                defaultValue={user?.email}
                placeholder="Ingresa tu email"
              />
            </Field>
            <Field>
              <Label htmlFor="phoneNumber">Teléfono</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={user?.phoneNumber}
                placeholder="Ingresa tu número de teléfono"
              />
            </Field>

            <Label>Foto de perfil</Label>
            <div className="h-20 w-20 relative mt-1">
              <Avatar className="w-full h-full">
                <AvatarImage src={profilePhoto} alt="profile image" />
                <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            <Field>
              <Input
                id="profilePhoto"
                type="file"
                name="profilePhoto"
                onChange={(e) => handleUpload(e, "image")}
              />
            </Field>
            <Field>
              <Label htmlFor="profileResume">Curriculum</Label>
              <Input
                id="profileResume"
                type="file"
                name="profileResume"
                onChange={(e) => handleUpload(e, "resume")}
              />
            </Field>
            <Field>
              <Label htmlFor="profileSkills">Habilidades</Label>
              <Input
                id="profileSkills"
                type="input"
                name="profileSkills"
                defaultValue={user?.profileSkills}
                placeholder="Ingresa tus habilidades separadas por comas"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
