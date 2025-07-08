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
      <section>
        <div className="container px-12 py-10 mx-auto">
          <h2 className="text-xl font-semibold text-center text-black lg:text-2xl mb-6">
            Häufig gestellte Fragen
          </h2>

          <div className="mt-8 lg:flex lg:gap-6 items-stretch">
            {/* Links Kolumn - Kategorien */}
            <div className="flex lg:flex-col p-4 bg-white rounded-md shadow-2xl min-h-[300px]">
              {faqData.map((category) => (
                <button
                  key={category.category}
                  onClick={() => handleCategoryClick(category)}
                  className={`block text-lg text-black hover:font-bold mb-2 border border-black rounded-lg p-3 w-full  hover:bg-gray-100 ${
                    selctedCategory.category === category.category
                      ? "font-bold text-black"
                      : "text-black"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Rechts Kategory - Fragen und Antworten */}
            <div className="flex-1 p-4 bg-white rounded-md shadow-2xl min-h-[300px]">
              {selctedCategory.questions.map(({ id, question, answer }) => (
                <div key={id} className="mb-2">
                  <button
                    onClick={() => switchQuestion(id)}
                    className="flex items-center justify-between text-black hover:font-bold border border-black rounded-lg p-3 mb-2 w-full hover:bg-gray-100"
                  >
                    <h3 className="mx-4 text-lg text-black">
                      {question}
                    </h3>

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
                  </button>

                  {openQuestionId === id && (
                    <div className="mt-2 ml-4 border-l-2 border-black pl-4 text-md text-gray-800">
                      <p className="max-w-3xl px-4 text-black">{answer}</p>
                    </div>
                  )}
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
