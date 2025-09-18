import ContextAbuse from '@/src/components/bad/ContextAbuse'
import CTA from '@/src/components/bad/CTA'
import EffectAbuse from '@/src/components/bad/EffectAbuse'
import Features from '@/src/components/bad/Features'
import Gallery from '@/src/components/bad/Gallery'
import Hero from '@/src/components/bad/Hero'
import KeyedList from '@/src/components/bad/KeyedList'
import MemoAbuse from '@/src/components/bad/MemoAbuse'
import UnstableProps from '@/src/components/bad/UnstableProps'

export const dynamic = 'force-dynamic'

export default function BadPage() {
  return (
    <>
      <Hero />
      <Features />
      <Gallery />
      <CTA />

      <ContextAbuse />
      <UnstableProps />
      <KeyedList />
      <EffectAbuse />
      <MemoAbuse />
    </>
  )
}
