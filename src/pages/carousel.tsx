import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Carousel from "../../lib/components/Carousel";
import { range } from "lodash-es";
import Text from "../../lib/components/Text";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

const pages = [{ title: "Carousel" }];

export default function Page() {
  const slides = range(1, 10);

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Carousel
          align="start"
          containScroll="keepSnaps"
          loop
          navigation
          skipSnaps
          slidesToScroll={1}
          plugins={[WheelGesturesPlugin()]}
        >
          {slides.map((s) => (
            <Carousel.Slide key={s} className="pl-4">
              <Stack className="w-44">
                <div className="group overflow-hidden rounded border border-transparent transition-colors hover:border-primary-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7JptBMGTikUK4CxJpG9cNTYAGjV.jpg"
                    alt="Poster"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <Text href="/test" className="text-sm">
                    O Telefone do Sr. Harrigan
                  </Text>
                  <Text variant="secondary" className="text-sm">
                    2022
                  </Text>
                </div>
              </Stack>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
