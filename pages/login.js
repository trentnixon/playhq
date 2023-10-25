import React from "react";
import PageBanner from "../components/Common/PageBanner";
import SignInForm from "../components/SignIn/SignInForm";
import Section from "../components/UI/DefaultSection";
import Link from "next/link";
import { Center, Space, Stack } from "@mantine/core";
import { P } from "../components/Members/Common/Type";

const SignIn = () => {
  const SectionData = {
    title: "Welcome Back to Fixtura!",
    paragraphs: [`Your digital cricketing journey awaits. Sign in to access a world of personalized content and powerful customization options tailored for your club or association.`],
  };
  return (
    <>
      <PageBanner pageTitle="" position={`top center`} />
      <Section {...SectionData} color="light">
        <Space h={50}/>
        <SignInForm />
        <Center>
          <Stack justify="flex-start" spacing="xs" h={50} mt={20}>
            <P textAlign={"center"} size={"xs"} marginBottom={0}>
              <Link href="/password-request">
                <a>Forgot Password?</a>
              </Link>
            </P>
            <P textAlign={"center"} size={"xs"} marginBottom={0}>
              Don’t have an account yet?{" "}
              <Link href="/SignUp">
                <a> Sign up here</a>
              </Link>
            </P>
          </Stack>
        </Center>
        <Space h={50}/>
      </Section>
    </>
  );
};

export default SignIn;
