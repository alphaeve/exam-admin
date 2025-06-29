import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Question } from '../types/types';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  onEdit: (question: Question) => void;
}

export const QuestionList = ({ onEdit }: Props) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://exampro-backend.onrender.com/api/questions');
      setQuestions(res.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id?: string) => {
    if (!id) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this question?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://exampro-backend.onrender.com/api/questions/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="space-y-4 max-w-5xl mx-auto mt-6 px-4">
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-md"
            />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">🚫 No questions found.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q._id}
            className="bg-white dark:bg-gray-800 transition hover:shadow-lg border border-gray-200 dark:border-gray-700 p-5 rounded-xl flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center group"
          >
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {q.questionText}
                </h3>
                {q.options && (
                  <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-300">
                    {q.options.map((opt, index) => (
                      <li
                        key={index}
                        className={
                          index === q.correctAnswer
                            ? 'font-bold text-green-600 dark:text-green-400'
                            : ''
                        }
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                  Branch: {q.branchId}
                </span>
                <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                  Test: {q.testId}
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <button
                onClick={() => onEdit(q)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all"
                title="Edit Question"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => deleteQuestion(q._id)}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-all"
                title="Delete Question"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
