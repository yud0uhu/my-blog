import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import {
  getProviders,
  getSession,
  signIn,
  SignInResponse,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { Container, StyledButton } from "../../features/login/styles";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { providers: providers ?? [], session },
  };
}

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleSignIn = async (providerId: string) => {
    const response: SignInResponse | undefined = await signIn(providerId);

    if (!response?.error) {
      router.push("/");
    }
  };

  return (
    <Container>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <StyledButton onClick={() => handleSignIn(provider.id)}>
            Sign in with {provider.name}
          </StyledButton>
        </div>
      ))}
    </Container>
  );
}
