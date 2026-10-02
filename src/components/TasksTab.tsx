import React, { useState } from 'react';
import { Task } from '../types';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  UserPlus, 
  Check, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Clock, 
  X
} from 'lucide-react';

interface TasksTabProps {
  tasks: Task[];
  familyMembers: string[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onAssignMember: (taskId: number, memberName: string) => void;
  onRemoveAssignee: (taskId: number, memberName: string) => void;
  onOpenMembersModal: () => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  familyMembers,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onAssignMember,
  onRemoveAssignee,
  onOpenMembersModal,
}) => {
  const [newTaskInput, setNewTaskInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [assigningTaskId, setAssigningTaskId] = useState<number | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskInput.trim()) {
      onAddTask(newTaskInput.trim());
      setNewTaskInput('');
    }
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-100">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Takım Ruhu & İş Bölümü</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center font-serif">
            Adil Görev Paylaşımı
          </h2>
          <p className="text-slate-600 text-base md:text-lg mt-1">
            Ev işlerini ve sorumlulukları sevgiyle paylaşmak, ailede "hepimiz biriz" duygusunu pekiştirir.
          </p>
        </div>

        {/* Progress Card */}
        {totalCount > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs min-w-[220px]">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
              <span>Haftalık Tamamlanma</span>
              <span className="text-emerald-600 font-bold">%{progressPercent}</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 text-right">
              {completedCount} / {totalCount} görev tamamlandı
            </div>
          </div>
        )}
      </div>

      {/* Main Task Card */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
        
        {/* Top Action Bar */}
        <div className="p-6 bg-slate-50/70 border-b border-slate-200/80 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              Hepsi ({totalCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'pending'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              Bekleyen ({totalCount - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              Tamamlanan ({completedCount})
            </button>
          </div>

          {/* New Task Form */}
          <form onSubmit={handleAdd} className="w-full lg:w-auto flex-grow max-w-lg relative">
            <input
              type="text"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              placeholder="Yeni bir aile görevi yazın... (örn: Balkon çiçeklerini sulamak)"
              className="w-full px-4 py-3 pr-24 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-sm shadow-2xs"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 rounded-lg font-bold text-xs transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ekle</span>
            </button>
          </form>

        </div>

        {/* Task Table / List */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200/80 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                <th className="p-4 w-16 text-center">Durum</th>
                <th className="p-4">Görev Açıklaması</th>
                <th className="p-4 w-72">Sorumlu Aile Üyesi</th>
                <th className="p-4 w-20 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400">
                    <CheckCircle2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-medium text-slate-600">Bu filtrede gösterilecek görev yok.</p>
                    <p className="text-xs text-slate-400 mt-1">Yukarıdaki formdan yeni bir görev ekleyebilirsiniz.</p>
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className={`transition-colors ${
                      task.done ? 'bg-slate-50/50' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer mx-auto ${
                          task.done
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-300 hover:border-emerald-400 bg-white'
                        }`}
                        title={task.done ? 'Yapılmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}
                      >
                        {task.done && <Check className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* Task Text */}
                    <td className="p-4">
                      <span
                        className={`text-sm md:text-base leading-relaxed ${
                          task.done
                            ? 'line-through text-slate-400'
                            : 'text-slate-800 font-medium'
                        }`}
                      >
                        {task.text}
                      </span>
                    </td>

                    {/* Assignees */}
                    <td className="p-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {task.assignees.map((assignee) => (
                          <span
                            key={assignee}
                            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-100"
                          >
                            <span>{assignee}</span>
                            <button
                              onClick={() => onRemoveAssignee(task.id, assignee)}
                              className="text-indigo-400 hover:text-red-500 p-0.5"
                              title="Kişiyi Çıkar"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}

                        {/* Assign Button / Popover */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setAssigningTaskId(assigningTaskId === task.id ? null : task.id)
                            }
                            className="text-xs text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-lg border border-dashed border-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Kişi Ata"
                          >
                            <UserPlus className="w-3 h-3" />
                            <span>Ata</span>
                          </button>

                          {/* Member Selection Menu */}
                          {assigningTaskId === task.id && (
                            <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-20 animate-in fade-in zoom-in-95">
                              <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                                Aile Üyesi Seç
                              </div>
                              {familyMembers.length === 0 ? (
                                <div className="p-2 text-xs text-slate-500">
                                  Henüz aile üyesi eklenmemiş.{' '}
                                  <button
                                    onClick={onOpenMembersModal}
                                    className="text-indigo-600 font-bold underline"
                                  >
                                    Ekle
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  {familyMembers.map((member) => {
                                    const isAlreadyAssigned = task.assignees.includes(member);
                                    return (
                                      <button
                                        key={member}
                                        disabled={isAlreadyAssigned}
                                        onClick={() => {
                                          onAssignMember(task.id, member);
                                          setAssigningTaskId(null);
                                        }}
                                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                          isAlreadyAssigned
                                            ? 'text-slate-300 cursor-default'
                                            : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium'
                                        }`}
                                      >
                                        <span>{member}</span>
                                        {isAlreadyAssigned && (
                                          <Check className="w-3 h-3 text-emerald-500" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Delete */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        title="Görevi Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Helpful Hint Card */}
      <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-2xl p-6 border border-emerald-100 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-emerald-950 leading-relaxed">
          <strong>İş Bölümü Kuralı:</strong> Evdeki görevler sadece bir kişinin (örneğin annenin veya babanın) sorumluluğu değildir. Yaşı ne olursa olsun her aile ferdinin yuvamıza katacağı küçük bir emek, o evi gerçek bir aile yapar.
        </div>
      </div>

    </div>
  );
};
