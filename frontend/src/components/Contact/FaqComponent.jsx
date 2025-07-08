import { useState } from "react";

const FaqComponent = ({ faqData }) => {
  const [selctedCategory, setSelectedCategory] = useState(faqData[0]);
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setOpenQuestionId(null); // offene Frage zurücksetzen
  };

  const switchQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div>
      <section className="bg-white">
        <div className="container px-6 py-12 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-black">
            Häufig gestellte Fragen
          </h2>

          <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
            {/* Links Kolumn - Kategorien */}
            <div className="lg:mx-12">
              {faqData.map((category) => (
                <button
                  key={category.category}
                  onClick={() => handleCategoryClick(category)}
                  className={`block text-black hover:underline mb-2 ${
                    selctedCategory.category === category.category
                      ? "font-bold text-blue-600"
                      : "text-black"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Rechts Kategory - Fragen und Antworten */}
            <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
              {selctedCategory.questions.map(({ id, question, answer }) => (
                <div key={id} className="mb-8">
                  <button
                    onClick={() => switchQuestion(id)}
                    className="flex items-center focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>

                    <h3 className="mx-4 text-xl text-black dark:text-black">
                      {question}
                    </h3>
                  </button>

                  {openQuestionId === id && (
                    <div className="flex mt-4 md:mx-10">
                      <p className="max-w-3xl px-4 text-black">{answer}</p>
                    </div>
                  )}

                  <hr className="my-8 border-gray-200 dark:border-gray-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqComponent;
