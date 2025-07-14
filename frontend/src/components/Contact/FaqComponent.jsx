import { useState } from "react";

const FaqComponent = ({ faqData }) => {
  const [selectedCategory, setSelectedCategory] = useState(faqData[0]);
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
        <div className="container px-12 py-10 mx-auto mb-8">
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
                  style={
                    selectedCategory.category === category.category
                      ? {
                          border: "2px solid black",
                          backgroundColor: "white",
                          color: "black",
                          fontWeight: "bold",
                        }
                      : {}
                  }
                  className={`block text-lg mb-2 p-3 w-full transition-all duration-200 ${
                    selectedCategory.category === category.category
                      ? "faq-category-active"
                      : "faq-section"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Rechts Kategory - Fragen und Antworten */}
            <div className="flex-1 p-4 bg-white rounded-md shadow-2xl min-h-[300px]">
              {selectedCategory.questions.map(({ id, question, answer }) => (
                <div key={id} className="mb-2">
                  <button
                    onClick={() => switchQuestion(id)}
                    style={
                      openQuestionId === id
                        ? {
                            border: "2px solid black",
                            backgroundColor: "white",
                            color: "black",
                            fontWeight: "bold",
                          }
                        : {}
                    }
                    className={`flex items-center justify-between p-3 mb-2 w-full transition-all duration-200 ${
                      openQuestionId === id
                        ? "faq-question-active"
                        : "faq-section"
                    }`}
                  >
                    <h3
                      className="mx-4 text-lg"
                      style={
                        openQuestionId === id
                          ? {
                              color: "black",
                              fontWeight: "bold",
                            }
                          : {}
                      }
                    >
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
                    <div className="mt-2 ml-4 faq-antwort">
                      <p className="max-w-3xl px-4 py-3">{answer}</p>
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
