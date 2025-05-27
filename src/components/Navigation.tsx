import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between py-8 max-w-6xl mx-auto px-4">
      <div className="flex items-center space-x-8">
        <Link
          href="#skip"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Skip to content
        </Link>
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Home
        </Link>
        <Link href="/blog" className="hover:text-gray-600 transition-colors">
          Blog
        </Link>
        <Link href="/snippets" className="hover:text-gray-600 transition-colors">
          Snippets
        </Link>
        <Link href="/resources" className="hover:text-gray-600 transition-colors">
          Resources
        </Link>
        <Link href="/projects" className="hover:text-gray-600 transition-colors">
          Projects
        </Link>
      </div>
    </nav>
  )
}
