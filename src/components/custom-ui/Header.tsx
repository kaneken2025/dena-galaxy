import { Home } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
}

export default function Header({ onHomeClick }: HeaderProps) {
  return (
    <button
      onClick={onHomeClick}
      className="glass-effect home-btn"
    >
      <Home size={18} />
      <span>Home</span>
    </button>
  );
}
