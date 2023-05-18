import React from "react";
import { useTranslation } from "next-i18next";
import { type GetStaticProps, type NextPage } from "next";
import Badge from "../components/Badge";
import DefaultLayout from "../layout/default";
import Drawer from "../components/Drawer";
import Button from "../components/Button";
import PopIn from "../components/motions/popin";
import { useAuth } from "../hooks/useAuth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { languages } from "../utils/languages";
import nextI18NextConfig from "../../next-i18next.config.js";

const Home: NextPage = () => {
  const { i18n } = useTranslation();
  const { session, status } = useAuth();
  const [showHelpDialog, setShowHelpDialog] = React.useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = React.useState(false);

  return (
    <DefaultLayout>
      <main className="flex min-h-screen flex-row">
        <Drawer
          showHelp={() => setShowHelpDialog(true)}
          showSettings={() => setShowSettingsDialog(true)}
        />
        <div
          id="content"
          className="z-10 flex min-h-screen w-full items-center justify-center p-2 sm:px-4 md:px-10"
        >
          <div
            id="layout"
            className="flex h-full w-full max-w-screen-xl flex-col items-center justify-between gap-1 py-2 sm:gap-3 sm:py-5 md:justify-center"
          >
            <div id="title" className="relative flex flex-col items-center font-mono">
              <div className="flex flex-row items-start shadow-2xl">
                <span className="text-4xl font-bold text-[#C0C0C0] xs:text-5xl sm:text-6xl">
                  Agent
                </span>
                <span className="text-4xl font-bold text-white xs:text-5xl sm:text-6xl">GPT</span>
                <PopIn delay={0.5}>
                  <Badge>
                    {`${i18n?.t("BETA", {
                      ns: "indexPage",
                    })}`}{" "}
                    🚀
                  </Badge>
                </PopIn>
              </div>
              <div className="mt-1 text-center font-mono text-[0.7em] font-bold text-white">
                <p>
                  {i18n.t("HEADING_DESCRIPTION", {
                    ns: "indexPage",
                  })}
                </p>
              </div>
              <div className="w-full items-stretch md:flex">
                <PricingItem />
                <PricingItem />
                <PricingItem />
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

interface PricingItemModel {
  title: string;
  description: string;
}

const PricingItem = () => {
  return (
    <div className="max-w-[25em] rounded-md border-[1px] border-white/30 bg-zinc-900 p-5 text-white">
      <div>
        <h2 className="text-3xl font-black">Free</h2>
        <p className="text-xs">
          Everything individuals need to supercharge their productivity with Agents.
        </p>
        <div className="mt-4 flex items-center gap-3 border-b-[1px]">
          <h1 className="text-4xl font-black">$0</h1>
          <div className="text-xs">
            <p>Free to use </p>
            <p>Forever</p>
          </div>
        </div>
      </div>
      <div className="my-2 text-sm">
        <p className="font-black">Features:</p>
        <ul className="ist-inside my-1 ml-8 list-decimal space-y-1 pl-4">
          <li>Up to 10 agent runs a day</li>
          <li>Tools such as web browsing</li>
          <li>Do something even more else</li>
        </ul>
        <Button>Start an agent</Button>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18NextConfig.ns)),
    },
  };
};
