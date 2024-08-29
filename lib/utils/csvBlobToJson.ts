import { ChangeEvent } from "react";
import { showNotification } from "../components/Notifications";
import blobToText from "./blobToText";

export default async function csvBlobToJson(
  event: ChangeEvent<HTMLInputElement>,
  encoding: "windows-1252" | "utf8",
) {
  if (!event.target.files?.[0]) {
    showNotification({
      icon: "error",
      message: "Nenhum arquivo foi selecionado",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const csv = await blobToText(event.target.files![0], encoding);

  event.target.value = "";

  const rows = csv.trim().split("\r\n");

  const headers = rows.shift()?.split(";");

  if (!headers) {
    return null;
  }

  const wrongValues: string[][] = [];
  const json: Record<string, string>[] = [];

  for (const row of rows) {
    const object: Record<string, string> = {};
    const values = row.split(";");
    if (values.length !== headers.length) {
      wrongValues.push(values);
    } else {
      for (let i = 0; i < headers.length; i++) {
        object[headers[i]] = values[i];
      }
      json.push(object);
    }
  }

  if (wrongValues.length) {
    showNotification({
      icon: "error",
      message: `A planilha está sendo importada em segundo plano mas ${wrongValues.length} items foram ignorados por estarem com o formato errado`,
    });
    console.error(wrongValues);
  } else {
    showNotification({
      icon: "success",
      message: "A planilha está sendo importada em segundo plano",
    });
  }

  return json;
}
