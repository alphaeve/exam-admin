import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Question } from '../types/types';
import { LoaderCircle } from 'lucide-react';

interface Props {
  editing?: Question;
  onSuccess: () => void;
}

export const QuestionForm = ({ editing, onSuccess }: Props) => {
  const [form, setForm] = useState<Question>({
    branchId: '',
    testId: '',
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    difficulty: 'easy',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (field: keyof Question, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (form._id) {
        await axios.put(`https://exampro-backend.onrender.com/api/questions/${form._id}`, form);
      } else {
        await axios.post('https://exampro-backend.onrender.com/api/questions', form);
      }
      setForm({
        branchId: '',
        testId: '',
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        difficulty: 'easy',
      });
      onSuccess();
    } catch (err) {
      console.error('Error saving question:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        {form._id ? '✏️ Update Question' : '➕ Add New Question'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Branch ID</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.branchId}
            onChange={(e) => handleChange('branchId', e.target.value)}
            placeholder="e.g. JEE / NEET"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Test ID</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.testId}
            onChange={(e) => handleChange('testId', e.target.value)}
            placeholder="e.g. JEE-1 / NEET-2"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Question</label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          rows={3}
          value={form.questionText}
          onChange={(e) => handleChange('questionText', e.target.value)}
          placeholder="Enter the question here"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">Options</label>
        <div className="space-y-3">
          {form.options.map((opt, i) => (
            <input
              key={i}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              value={opt}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => {
                const newOpts = [...form.options];
                newOpts[i] = e.target.value;
                setForm({ ...form, options: newOpts });
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Correct Option Index <span className="text-xs text-gray-500">(0 to 3)</span>
          </label>
          <input
            type="number"
            min={0}
            max={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.correctAnswer}
            onChange={(e) => handleChange('correctAnswer', +e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Difficulty</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.difficulty}
            onChange={(e) => handleChange('difficulty', e.target.value as any)}
          >
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟠 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Explanation</label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          rows={2}
          value={form.explanation}
          onChange={(e) => handleChange('explanation', e.target.value)}
          placeholder="Why is this the correct answer?"
        />
      </div>

      <div className="pt-4 text-center">
        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <LoaderCircle className="animate-spin" size={18} />
              Saving...
            </>
          ) : (
            form._id ? 'Update Question' : 'Add Question'
          )}
        </button>
      </div>
    </form>
  );
};
