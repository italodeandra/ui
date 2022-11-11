import ErrorPage from "./ErrorPage";

export default function Error404Page() {
  return (
    <ErrorPage
      error={404}
      title="Uh oh! I think you're lost."
      description="It looks like the page you're looking for doesn't exist."
    />
  );
}
