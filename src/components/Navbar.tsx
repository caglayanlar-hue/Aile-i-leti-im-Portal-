import React from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Gamepad2, 
  BookOpen, 
  MessageSquareHeart, 
  CheckSquare, 
  Coffee, 
  Menu, 
  X, 
  Users, 
  UserPlus 
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  familyMembers: string[];
  onOpenMembersModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  familyMembers,
  onOpenMembersModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home' as TabType, label: 'Ana Sayfa', icon: Home },
    { id: 'daily' as TabType, label: 'Oyun & Etkinlik', icon: Gamepad2 },
    { id: 'book' as TabType, label: '"Aile Dediğin" Rehberi', icon: BookOpen },
    { id: 'chat' as TabType, label: 'İletişim Köşesi', icon: MessageSquareHeart },
    { id: 'tasks' as TabType, label: 'Görevler', icon: CheckSquare },
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-xs sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleTabClick('home')}
          >
            <div className="w-11 h-11 bg-indigo-50 group-hover:bg-indigo-100 transition-colors rounded-2xl flex items-center justify-center text-indigo-600 shadow-xs">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight text-slate-800 font-serif block leading-none">
                Aile Bağları
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                "Aile Dediğin" Platformu
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Special Highlight for Family Meeting */}
            <button
              onClick={() => handleTabClick('meeting')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all shadow-xs ${
                activeTab === 'meeting'
                  ? 'bg-amber-500 text-white shadow-amber-500/20'
                  : 'text-amber-700 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/50'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>Aile Toplantısı</span>
            </button>
          </nav>

          {/* Right Action: Family Members Badge & Manage */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenMembersModal}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/70 transition-all"
              title="Aile Üyelerini Düzenle"
            >
              <Users className="w-3.5 h-3.5 text-teal-600" />
              <span>{familyMembers.length} Aile Üyesi</span>
              <UserPlus className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={onOpenMembersModal}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1"
              title="Üyeleri Yönet"
            >
              <Users className="w-4 h-4 text-teal-600" />
              <span className="font-medium">{familyMembers.length}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-xl hover:bg-slate-100"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 shadow-xl px-4 pt-3 pb-5 space-y-1 animate-in slide-in-from-top-3 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-3 w-full text-left px-3.5 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => handleTabClick('meeting')}
            className={`flex items-center gap-3 w-full text-left px-3.5 py-3 rounded-xl text-base font-bold transition-all ${
              activeTab === 'meeting'
                ? 'bg-amber-500 text-white'
                : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            <Coffee className="w-5 h-5" />
            <span>Haftalık Aile Toplantısı</span>
          </button>
        </div>
      )}
    </header>
  );
};
