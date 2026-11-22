import {
  EcosystemBand,
  FeaturedWork,
  Hero,
  IndustriesTeaser,
  ProcessTeaser,
  ProofStrip,
  ServicesGrid,
  Testimonial,
  WhyIhifix,
} from '@/components/home/home-sections'
import { CtaBand } from '@/components/site/primitives'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ServicesGrid />
      <FeaturedWork />
      <WhyIhifix />
      <IndustriesTeaser />
      <ProcessTeaser />
      <Testimonial />
      <CtaBand />
      <EcosystemBand />
    </>
  )
}
