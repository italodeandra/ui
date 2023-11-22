import { GetServerSidePropsContext, NextApiRequest } from "next";
export default function getOrigin(req: NextApiRequest | GetServerSidePropsContext["req"]): string;
