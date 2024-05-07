import Group from "../Group";
import { ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Stack from "../Stack";
import Text from "../Text/Text";
import numeral from "numeral";
import Button from "../Button";
import {
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { FileFile, FileInputFile, FileUrl } from "./FileInput";

const videoExtensions = [".mp4"];
const imageExtensions = [".png", ".jpg", ".jpeg", ".webp"];

export function PreviewFile({
  file,
  readOnly,
  handleDeleteClick,
  downloadText,
  openText,
  preview,
}: {
  file: FileInputFile;
  readOnly?: boolean;
  handleDeleteClick: () => void;
  downloadText: string;
  openText: string;
  preview?: boolean;
}) {
  const url = (file as FileFile).file
    ? URL.createObjectURL((file as FileFile).file)
    : (file as FileUrl).url;

  return (
    <div className="group relative flex items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800">
      {preview &&
      (file.type?.startsWith("video") ||
        videoExtensions.some((e) => url.endsWith(e))) ? (
        <video className="max-h-96 rounded-md" src={url} controls />
      ) : preview &&
        (file.type?.startsWith("image") ||
          imageExtensions.some((e) => url.endsWith(e))) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={file.description} className="max-h-96 rounded-md" />
      ) : (
        <Group className="max-w-full items-center gap-4 p-3">
          <div className="rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800">
            <DocumentIcon className="h-5 w-5" />
          </div>
          <Stack className="flex-1 gap-1 overflow-hidden">
            <div className="flex-1 truncate" title={file.name}>
              {file.name}
            </div>
            {file.description && <div>{file.description}</div>}
            <Text size="sm">{file.type}</Text>
            {!!file.size && (
              <Text size="sm">{numeral(file.size).format("0b")}</Text>
            )}
            {!url.startsWith("blob") && (
              <Group className="mr-auto">
                <Button
                  leading={<ArrowTopRightOnSquareIcon />}
                  href={url}
                  target="_blank"
                >
                  {openText}
                </Button>
                <Button
                  leading={<ArrowDownTrayIcon />}
                  href={url}
                  download={file.name}
                >
                  {downloadText}
                </Button>
              </Group>
            )}
          </Stack>
        </Group>
      )}
      {!readOnly && (
        <Button
          icon
          variant="filled"
          color="default"
          className="absolute right-2 top-2 group-hover:opacity-100 sm:opacity-0"
          onClick={handleDeleteClick}
        >
          <TrashIcon />
        </Button>
      )}
    </div>
  );
}
