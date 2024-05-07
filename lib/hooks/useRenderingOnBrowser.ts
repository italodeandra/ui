import { useRendersCount } from "react-use";

export default function useRenderingOnBrowser() {
  const rendersCount = useRendersCount();
  return rendersCount > 1;
}
