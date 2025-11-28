import { Employee } from '../../data';
import { ExternalLink, X } from 'lucide-react';

interface DetailCardProps {
  node: Employee | null;
  onClose: () => void;
}

export default function DetailCard({ node, onClose }: DetailCardProps) {
  if (!node) return null;

  return (
    <div className="glass-effect detail-card">
      <button onClick={onClose} className="close-btn">
        <X size={20} />
      </button>

      <div className="info-list">
        <InfoItem label="Name" value={node.name} isMain />
        <InfoItem label="Year" value={node.year.toString()} />
        <InfoItem label="Dept" value={node.dept} />
        <InfoItem label="Memo" value={node.memo} isMemo />
      </div>

      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="chat-link-btn"
      >
        <span>Chat URL</span>
        <ExternalLink size={16} className="chat-link-icon" />
      </a>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
  isMain?: boolean;
  isMemo?: boolean;
}

function InfoItem({ label, value, isMain = false, isMemo = false }: InfoItemProps) {
  let valueClassName = "info-value";
  if (isMain) valueClassName += " main";
  if (isMemo) valueClassName += " memo";

  return (
    <div className="info-item">
      <span className="info-label">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}
