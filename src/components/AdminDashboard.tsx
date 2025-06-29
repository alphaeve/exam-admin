import React, { useState } from 'react';
import { QuestionForm } from './QuestionForm';
import { QuestionList } from './QuestionList';
import { PlusCircle, ListOrdered } from 'lucide-react';

const AdminDashboard = () => {
  const [view, setView] = useState<'add' | 'list'>('add');

  const buttonStyle = (isActive: boolean) =>
    `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-200 
     ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100 text-gray-700'}`;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-8 text-center">
        🛠️ Admin Question Portal
      </h1>

      <div className="flex justify-center gap-4 mb-10">
        <button className={buttonStyle(view === 'add')} onClick={() => setView('add')}>
          <PlusCircle size={18} />
          Add Question
        </button>
        <button className={buttonStyle(view === 'list')} onClick={() => setView('list')}>
          <ListOrdered size={18} />
          Manage Questions
        </button>
      </div>

      <div className="animate-fade-in">
        {view === 'add' ? (
          <QuestionForm onSuccess={() => setView('list')} />
        ) : (
          <QuestionList onEdit={() => setView('add')} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
