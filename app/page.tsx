import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { Strip } from '@/components/sections/strip'
import { Services } from '@/components/sections/services'
import { Portfolio } from '@/components/sections/portfolio'
import { Process } from '@/components/sections/process'
import { Why } from '@/components/sections/why'
import { Faq } from '@/components/sections/faq'
import { Contact } from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Strip />
        <Services />
        <Portfolio />
        <Process />
        <Why />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
