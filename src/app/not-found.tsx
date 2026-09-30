import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="grid min-h-[80dvh] place-items-center pt-24">
      <Container className="text-center">
        <p className="text-8xl font-normal tracking-tight text-brand sm:text-9xl">404</p>
        <h1 className="mt-6 text-3xl font-normal sm:text-4xl">We couldn&apos;t find that page</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you asked for doesn&apos;t exist or has moved.</p>
        <ButtonLink href="/" size="lg" className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </section>
  );
}
