import Group from "../Group";
import { ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Stack from "../Stack";
import Text from "../Text";
import numeral from "numeral";
import Button from "../Button";
import {
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { FileFile, FileInputFile, FileUrl } from "./FileInput";
import { ReactNode } from "react";

const videoExtensions = [".mp4"];
const imageExtensions = [".png", ".jpg", ".jpeg", ".webp"];

export function PreviewFile({
  file,
  readOnly,
  handleDeleteClick,
  downloadText,
  openText,
  display = "info",
  additionalInfo,
  index,
}: {
  file: FileInputFile;
  readOnly?: boolean;
  handleDeleteClick: () => void;
  downloadText: string;
  openText: string;
  display?: "info" | "preview" | "both";
  additionalInfo?: (file: FileInputFile, index: number) => ReactNode;
  index: number;
}) {
  const url = (file as FileFile).file
    ? URL.createObjectURL((file as FileFile).file)
    : (file as FileUrl).url;

  const isVideo =
    file.type?.startsWith("video") ||
    videoExtensions.some((e) => url.endsWith(e));
  const isImage =
    file.type?.startsWith("image") ||
    imageExtensions.some((e) => url.endsWith(e));

  if (display === "preview" && !isVideo && !isImage) {
    display = "info";
  }

  return (
    <div className="group relative flex flex-wrap items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800">
      {["preview", "both"].includes(display) &&
        (isVideo ? (
          <video className="max-h-96 rounded-md" src={url} controls />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={file.description}
            className="max-h-96 rounded-md"
          />
        ))}
      {["info", "both"].includes(display) && (
        <Group className="w-full items-center gap-0">
          {display === "info" && (
            <div className="m-2 mr-0 rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800">
              <DocumentIcon className="h-5 w-5" />
            </div>
          )}
          <Stack className="w-full overflow-hidden p-3">
            <Stack className="gap-1">
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
            {additionalInfo && additionalInfo(file, index)}
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
