'use client'

export default function TopNav() {
  return (
    <header className="ml-64 w-[calc(100%-16rem)] h-16 sticky top-0 z-40 bg-white/80 backdrop-blur-xl flex justify-between items-center px-8 border-b border-slate-100">
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-96 group focus-within:ring-2 ring-primary/20 transition-all">
        <span className="material-symbols-outlined text-slate-400 text-xl mr-2">search</span>
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium placeholder:text-slate-400" 
          placeholder="Search operations, personnel, or venues..." 
          type="text"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900 leading-none">Operations Lead</p>
            <p className="text-[10px] text-slate-500 font-medium">Main Hub</p>
          </div>
          <img 
            alt="User Profile" 
            className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDstIf-FAqEF2Nz5r3eaMYyHD1zRFf1zuSBYurCeQ9RUmXccj1hn-YuLAVw-DToaqdHPt-qyF3GvoxNrAp2TRvcVT0JEgUMnx7mgcRLBHc1zS5JLGyf3QmpDKchBHFKyWqnAH2eGEjnXQN3S5Fl-cpyQHRcjor5OkTkTWOejsfuaAN_H7zYRXZfVS3tSpOgUiJ1LwK3UjPYFceNERNR3X3EHNmoN1a-sfz6edY3_O1kewIeUR9ASPpP2ugJ2v625PFCWAuENvqkCoc"
          />
        </div>
      </div>
    </header>
  )
}