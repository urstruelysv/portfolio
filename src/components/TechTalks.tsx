import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const techTalks = [
  {
    title: "Components Of A Great Portfolio Website",
    description: "I talk about how to create a targeted website to land more job interviews and freelance clients with all the other things that matter. Hosted on codementor.",
    platform: "codementor.io",
    href: "https://www.youtube.com/watch?v=viXpJ5Xwtfs",
    thumbnail: "https://ext.same-assets.com/1481338541/685135541.jpeg"
  },
  {
    title: "Crafting The Perfect Portfolio Website For Developers",
    description: "Talked about how to effectively utilise a portfolio website to put yourself in the best position to win.",
    platform: "roc8.careers",
    href: "https://www.youtube.com/watch?v=yKVCl1jFkQQ",
    thumbnail: "https://ext.same-assets.com/1481338541/774983900.png"
  },
  {
    title: "How To Use Algochurn To Clear Technical Interviews With Ease.",
    description: "Algochurn is a free resource that helps front-end developers practice machine coding questions. Here I talk about how to effectively make use of Algochurn.",
    platform: "Youtube",
    href: "https://www.youtube.com/watch?v=sZA-WrS39KI&t=19s",
    thumbnail: "https://ext.same-assets.com/1481338541/1970648078.png"
  },
  {
    title: "How To Implement Debouncing In React.",
    description: "Debouncing is a method of preventing a function from being invoked too often. In this video, I talk about how to create a custom debounce function from scratch.",
    platform: "Youtube",
    href: "https://www.youtube.com/watch?v=uncrKqVtgrc",
    thumbnail: "https://ext.same-assets.com/1481338541/1023540151.png"
  }
]

export default function TechTalks() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Tech Talks and Videos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {techTalks.map((talk, index) => (
          <Link key={index} href={talk.href} className="block">
            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-video relative mb-4">
                  <Image
                    src={talk.thumbnail}
                    alt={talk.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {talk.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {talk.description}
                  </p>
                  <p className="text-xs text-gray-500">{talk.platform}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Link
        href="https://www.youtube.com/channel/UC7MQDjVfjEPkHMe1lZGkDRA"
        className="text-blue-600 hover:underline font-medium"
      >
        See All Videos
      </Link>
    </section>
  )
}
