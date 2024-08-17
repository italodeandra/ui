import { MouseEvent, TouchEvent } from "react";

export default function stopPropagation(event: MouseEvent | TouchEvent) {
  event.stopPropagation();
}
