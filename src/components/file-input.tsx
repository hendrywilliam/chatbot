import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { UploadIcon } from "./ui/icons";
import { buttonVariants } from "./ui/button";
import { truncate } from "@/lib/utils";

interface Props {
  file?: File | null;
  setFile?: Dispatch<SetStateAction<File | Blob | any>>;
}

export function FileInput({ file, setFile }: Props) {
  return (
    <div className="mb-2">
      <label
        htmlFor="file_upload"
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: "flex space-x-1",
        })}
      >
        <UploadIcon />
        {file && file.name ? (
          <span>{truncate(file.name, 20)}</span>
        ) : (
          <span>Upload</span>
        )}
      </label>
      <Input
        type="file"
        className="hidden"
        id="file_upload"
        name="file_upload"
        accept=".pdf"
        onChange={(event) =>
          event.target.files && setFile && setFile(event.target.files[0])
        }
      />
    </div>
  );
}
