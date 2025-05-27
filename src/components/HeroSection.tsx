import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section id="skip" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-start gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">Manu Arora</h1>
          <p className="text-lg text-gray-600 mb-4">
            Building{' '}
            <Link href="https://aceternity.com" className="text-blue-600 hover:underline">
              Aceternity
            </Link>
            ,{' '}
            <Link href="https://userogue.com" className="text-blue-600 hover:underline">
              Rogue
            </Link>
            {' '}other cool things
          </p>
          <p className="text-gray-700 leading-relaxed">
            Senior Software Engineer building SaaS products and web apps.
            Find me on{' '}
            <Link href="https://twitter.com/mannupaaji" className="text-blue-600 hover:underline">
              twitter
            </Link>
            {' '}for tech updates and memes.
          </p>
        </div>
        <div className="shrink-0">
          <Image
            src="https://ext.same-assets.com/1481338541/849522504.png"
            alt="Manu Arora profile picture"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Social Link */}
      <div className="mb-12">
        <Link
          href="https://twitter.com/mannupaaji"
          className="inline-block hover:opacity-75 transition-opacity"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
