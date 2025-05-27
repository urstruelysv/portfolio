import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

const blogPosts = [
  {
    title: "Ace the Javascript Interview - Practical questions to help you clear your next interview",
    views: "17,041 views",
    href: "/blog/ace-the-javascript-interview"
  },
  {
    title: "Free portfolio website template that gets you hired in 2021",
    views: "5,819 views",
    href: "/blog/developer-portfolio-website"
  }
]

export default function RecentBlogs() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Recent Blogs</h2>

      <div className="space-y-4 mb-6">
        {blogPosts.map((post, index) => (
          <Link key={index} href={post.href} className="block">
            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2 text-gray-900 leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">{post.views}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Link
        href="/blog"
        className="text-blue-600 hover:underline font-medium"
      >
        See All Blogs
      </Link>
    </section>
  )
}
