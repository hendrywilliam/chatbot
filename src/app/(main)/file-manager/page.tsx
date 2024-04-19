import FileUploadForm from "@/components/file-manager/file-upload-form";
import FileList from "@/components/file-manager/file-list";
import { currentUser } from "@clerk/nextjs";
import { UserObjectCustomized } from "@/types";

export default async function FileManagerPage() {
  const user = (await currentUser()) as UserObjectCustomized;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <div className="flex flex-col space-y-4">
        <FileList lists={user.privateMetadata.images} />
        <FileUploadForm />
      </div>
    </div>
  );
}
