import { FilterMode } from '../../App';

interface SidebarProps {
  currentMode: FilterMode;
  onModeChange: (mode: FilterMode) => void;
}

export default function Sidebar({ currentMode, onModeChange }: SidebarProps) {
  const buttons: { label: string; mode: FilterMode }[] = [
    { label: 'All', mode: 'ALL' },
    { label: 'Sync', mode: 'SYNC' },
    { label: 'Dept.', mode: 'DEPT' },
  ];

  return (
    <div className="glass-effect sidebar">
      <h1 className="sidebar-title">
        DeNA Galaxy
      </h1>

      <div className="sidebar-buttons">
        {buttons.map((btn) => {
          const isActive = currentMode === btn.mode;
          return (
            <button
              key={btn.mode}
              onClick={() => onModeChange(btn.mode)}
              className={`sidebar-btn ${isActive ? 'active' : 'inactive'}`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
