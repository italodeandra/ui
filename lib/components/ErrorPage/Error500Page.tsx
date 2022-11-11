import ErrorPage from "./ErrorPage";

export default function Error500Page() {
  return (
    <ErrorPage
      error={500}
      title="Something bad just happened..."
      description="Our servers could not handle your request. Don't worry, our development team was already notified. Try refreshing the page."
    />
  );
}
