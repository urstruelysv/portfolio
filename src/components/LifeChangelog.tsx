import Link from 'next/link'

const changelogData = [
  {
    year: "2023",
    items: [
      {
        title: "300+ users on Algochurn",
        description: "Algochurn crossed 300 users and I couldn't be any happier.",
        link: "https://algochurn.com"
      }
    ]
  },
  {
    year: "2022",
    items: [
      {
        title: "Started working on Moonbeam",
        description: "Started working on Moonbeam as a front-end developer. Building a chrome extension was the most fun and challenging part.",
        link: "https://gomoonbeam.com"
      },
      {
        title: "Algochurn crosses 200 users",
        description: "Algochurn is now helping 200+ registered users and 14,000+ monthly users.",
        link: "https://algochurn.com"
      },
      {
        title: "1,000+ Followers on Twitter",
        description: "Crossed 1,000 mark on Twitter. You can help increase the count by following me.",
        link: "https://www.twitter.com/mannupaaji"
      },
      {
        title: "Built and launched Algochurn",
        description: "Built Algochurn, A platform to practice DS ALgo along with front-end to ace your next technical interview.",
        link: "https://algochurn.com"
      },
      {
        title: "Promoted to Senior Software Engineer",
        description: "Promoted to Senior Software Engineer - Worked on applications handling 20,000+ users per day. Working on Web, Mobile, and even TV applications."
      }
    ]
  },
  {
    year: "2021",
    items: [
      {
        title: "Built Tailwind Master Kit",
        description: "Built TailwindMasterKit, A SaaS marketplace for beautiful, handcrafted Website components built with and for Tailwind supported websites. Built the components from the ground up for React and HTML in 30+ categories.",
        link: "https://www.tailwindmasterkit.com"
      },
      {
        title: "Created covidrescue.co.in",
        description: "Created covidrescue.co.in to help people with verified leads on Oxygen, Remdesivir, Food, Beds, ICU, Medicines and more.",
        link: "https://www.covidrescue.co.in"
      },
      {
        title: "Created Covid-19 Vaccination slots notification system",
        description: "Integrated Vaccination slots notification system in covidrescue web app. Notified people whenever vaccination slot was available in their area and city."
      }
    ]
  },
  {
    year: "2020",
    items: [
      {
        title: "Joined mroads",
        description: "Joined mroads as a Software Development Engineer. Working on their Flagship product as a Front-End Developer."
      },
      {
        title: "Cleared GATE 2019",
        description: "Cleared GATE 2019 after 8 months of continuous studies. I still hate Computer System Architecture & Organization."
      },
      {
        title: "Competitive Programming",
        description: "Cleared Hackerrank and Hackerearth contests. Got a strong grip on Competitive Programming."
      },
      {
        title: "Taught programming to students",
        description: "Taught fundamental programming to school students. It included Basic C programming, Introduction to Web Development and logic building."
      }
    ]
  },
  {
    year: "2019",
    items: [
      {
        title: "Placements - Got Placed",
        description: "Had 3 offers in Hand. 1 On-Campus and 2 Off-Campus in the Software Developer (Full-Stack) roles."
      },
      {
        title: "Full-Stack Applications",
        description: "Started freelancing, developed full-stack applications for clients ranging from E-Commerce stores to static landing pages."
      },
      {
        title: "GATE Preparation",
        description: "Started preparing for GATE (Graduate Aptitute Test in Engineering). Learnt all the Computer Science subjects again from scratch."
      }
    ]
  }
]

export default function LifeChangelog() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Life Changelog and Updates</h2>

      <div className="space-y-8">
        {changelogData.map((yearData, yearIndex) => (
          <div key={yearIndex}>
            <h3 className="text-xl font-semibold mb-4">{yearData.year}</h3>
            <div className="space-y-4">
              {yearData.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                      {item.link && (
                        <>
                          {' '}
                          <Link
                            href={item.link}
                            className="text-blue-600 hover:underline"
                          >
                            {item.link.replace('https://', '').replace('www.', '')}
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
