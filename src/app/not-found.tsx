import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80dvh] place-items-center pt-24">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <Container className="text-center">
        <p className="text-gradient font-display text-8xl font-semibold sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">This page drifted out of orbit</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <ButtonLink href="/" size="lg" arrow className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </section>
  );
}
