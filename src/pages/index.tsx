import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-primary-600">Demo</h2>
          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            @italodeandra/ui
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Demonstration of our UI library.
          </p>
        </div>
      </div>
    </div>
  );
}

HomePage.getLayout = getPublicLayout;
