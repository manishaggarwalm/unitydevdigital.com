import { BannerCarousel } from "@/components/sections/BannerCarousel";
import { Hero } from "@/components/sections/Hero";
import { Tools } from "@/components/sections/Tools";
import { Services } from "@/components/sections/Services";
import { Commitments } from "@/components/sections/Commitments";
import { Engagement } from "@/components/sections/Engagement";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Work } from "@/components/sections/Work";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { faqs } from "@/content/home";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <BannerCarousel />
      <Hero />
      <Tools />
      <Services />
      <Commitments />
      <Engagement />
      <Process />
      <WhyUs />
      <Work />
      <Faq />
      <Contact />
    </>
  );
}
