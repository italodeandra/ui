import { useRendersCount } from "react-use";

export default function useRenderingOnBrowser() {
  let rendersCount = useRendersCount();
  return rendersCount > 1;
}
