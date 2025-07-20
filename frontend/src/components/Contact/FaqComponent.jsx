import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const FaqComponent = ({ faqData }) => {
  const { isDark } = useTheme();
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
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      <section>
        <div className="container px-12 py-10 mx-auto mb-8">
          <h2
            className="text-xl font-semibold text-center lg:text-2xl mb-6"
            style={{ color: "var(--text-color)" }}
          >
            Häufig gestellte Fragen
          </h2>

          <div className="mt-8 lg:flex lg:gap-6 items-stretch">
            {/* Links Kolumn - Kategorien */}
            <div
              className="flex lg:flex-col p-4 rounded-md shadow-2xl min-h-[300px]"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              {faqData.map((category) => (
                <button
                  key={category.category}
                  onClick={() => handleCategoryClick(category)}
                  style={
                    selectedCategory.category === category.category
                      ? {
                          border: `2px solid var(--accent-color)`,
                          backgroundColor: "var(--accent-color)",
                          color: "white",
                          fontWeight: "bold",
                        }
                      : {
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-color)",
                          border: `1px solid ${
                            isDark ? "var(--border-color)" : "#e5e7eb"
                          }`,
                        }
                  }
                  className={`block text-lg mb-2 p-3 w-full transition-all duration-200 rounded hover:opacity-80`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Rechts Kategory - Fragen und Antworten */}
            <div
              className="flex-1 p-4 rounded-md shadow-2xl min-h-[300px]"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              {selectedCategory.questions.map(({ id, question, answer }) => (
                <div key={id} className="mb-2">
                  <button
                    onClick={() => switchQuestion(id)}
                    style={
                      openQuestionId === id
                        ? {
                            border: `2px solid var(--accent-color)`,
                            backgroundColor: "var(--accent-color)",
                            color: "white",
                            fontWeight: "bold",
                          }
                        : {
                            backgroundColor: "var(--bg-primary)",
                            color: "var(--text-color)",
                            border: `1px solid ${
                              isDark ? "var(--border-color)" : "#e5e7eb"
                            }`,
                          }
                    }
                    className="flex items-center justify-between p-3 mb-2 w-full transition-all duration-200 rounded hover:opacity-80"
                  >
                    <h3
                      className="mx-4 text-lg text-left"
                      style={{
                        color:
                          openQuestionId === id ? "white" : "var(--text-color)",
                        fontWeight: openQuestionId === id ? "bold" : "normal",
                      }}
                    >
                      {question}
                    </h3>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`size-6 transition-transform duration-200 ${
                        openQuestionId === id ? "rotate-180" : ""
                      }`}
                      style={{
                        color:
                          openQuestionId === id ? "white" : "var(--text-color)",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>

                  {openQuestionId === id && (
                    <div
                      className="mt-2 ml-4 rounded-md"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        border: `1px solid ${
                          isDark ? "var(--border-color)" : "#e5e7eb"
                        }`,
                      }}
                    >
                      <p
                        className="max-w-3xl px-4 py-3"
                        style={{ color: "var(--text-color)" }}
                      >
                        {answer}
                      </p>
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
