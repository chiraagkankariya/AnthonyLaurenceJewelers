import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import ShopByCategory from '@/components/home/ShopByCategory'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSnippet from '@/components/home/AboutSnippet'
import GoogleReviews from '@/components/home/GoogleReviews'
import ConsultationBanner from '@/components/home/ConsultationBanner'
import FadeInSection from '@/components/ui/FadeInSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FadeInSection>
        <FeaturedProducts />
      </FadeInSection>
      <FadeInSection>
        <ShopByCategory />
      </FadeInSection>
      <FadeInSection>
        <ServicesSection />
      </FadeInSection>
      <FadeInSection>
        <AboutSnippet />
      </FadeInSection>
      <FadeInSection>
        <GoogleReviews />
      </FadeInSection>
      <ConsultationBanner />
    </>
  )
}
