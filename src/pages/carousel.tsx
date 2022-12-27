import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import { Carousel } from "../../lib/components/Carousel/Carousel";
import { range } from "lodash";
import Text from "../../lib/components/Text/Text";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Carousel" }];

export default function CarouselDemoPage() {
  let slides = range(1, 10);

  return (
    <>
      <NextSeo title="Carousel" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Carousel
          align="start"
          containScroll="keepSnaps"
          loop
          navigation
          skipSnaps
          slidesToScroll={1}
        >
          {slides.map((s) => (
            <Carousel.Slide key={s} className="pl-4">
              <Stack className="w-44">
                <div className="group overflow-hidden rounded border border-transparent transition-colors hover:border-primary-500">
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

CarouselDemoPage.getLayout = getPublicLayout;
