import Container from "./Container";

interface EducationItem {
  title: string;
  description: string;
  year?: string;
}

interface YearData {
  year: string;
  items: EducationItem[];
}

const changelogData: YearData[] = [
  {
    year: "Education",
    items: [
      {
        title: "Bachelor of Technology",
        description: "Jawaharlal Nehru Technological University, Hyderabad",
        year: "2018-2022",
      },
      {
        title: "Intermediate Education",
        description: "Sri Gayatri Junior College, Hyderabad",
        year: "2017-2018",
      },
      {
        title: "Secondary School Certificate",
        description: "Shadnagar English Medium High School, Shadnagar",
        year: "2016",
      },
    ],
  },
];

export default function LifeChangelog() {
  return (
    <Container>
      <section className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
          Academic Journey
        </h2>

        <div className="space-y-8">
          {changelogData.map((yearData, yearIndex) => (
            <div key={yearIndex}>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {yearData.year}
              </h3>
              <div className="space-y-4">
                {yearData.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-4">
                    <div className="shrink-0 mt-1 flex items-center justify-center w-5 h-5 border border-blue-600 dark:border-blue-500 rounded-full">
                      <span className="text-blue-600 dark:text-blue-500 text-xs">
                        &#x2714;
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {item.title}{" "}
                        {item.year && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.year}
                          </span>
                        )}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-8 border-gray-200 dark:border-gray-700" />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
