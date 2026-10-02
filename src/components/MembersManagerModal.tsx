import React, { useState } from 'react';
import { X, Plus, Users, User, Trash2 } from 'lucide-react';

interface MembersManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: string[];
  onAddMember: (name: string) => void;
  onRemoveMember: (name: string) => void;
}

export const MembersManagerModal: React.FC<MembersManagerModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  onAddMember,
  onRemoveMember,
}) => {
  const [nameInput, setNameInput] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onAddMember(nameInput.trim());
      setNameInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[150] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-in zoom-in-95 duration-200 border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 font-serif">
                Aile Üyelerimiz
              </h3>
              <p className="text-xs text-slate-400">
                Portala dahil olan aile fertleri
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Yeni üye adı (örn: Anne, Kerem...)"
            className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-400 outline-none text-sm bg-slate-50 focus:bg-white"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ekle</span>
          </button>
        </form>

        {/* List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 mb-6">
          {familyMembers.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              Henüz üye eklenmedi.
            </div>
          ) : (
            familyMembers.map((member) => (
              <div
                key={member}
                className="bg-slate-50 p-3 rounded-xl flex items-center justify-between border border-slate-100 text-sm font-medium text-slate-700"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span>{member}</span>
                </div>

                <button
                  onClick={() => onRemoveMember(member)}
                  className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                  title="Üyeyi Çıkar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm transition-all"
        >
          Tamamla ve Kapat
        </button>
      </div>
    </div>
  );
};
