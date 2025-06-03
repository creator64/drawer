import { EDirent } from '@lib/types';
import { stripFileExtension } from '../../lib/utils/strip-file-extension';
import DrawIcon from '@mui/icons-material/Draw';
import FolderIcon from '@mui/icons-material/Folder';

interface ExplorerEntryProps {
  dirent: EDirent;
  onDirentClick: (dirent: EDirent) => void;
}

export const ExplorerEntry = ({ dirent, onDirentClick }: ExplorerEntryProps) => {
  const iconSize = '1.9rem';
  return (
    <div className="explorer entry" onClick={() => onDirentClick(dirent)}>
      {dirent.isDirectory ? (
        <FolderIcon style={{ fontSize: iconSize }} />
      ) : (
        <DrawIcon style={{ fontSize: iconSize }} />
      )}
      <p className="truncate">
        {dirent.isDirectory ? dirent.name : stripFileExtension(dirent.name)}
      </p>
    </div>
  );
};
