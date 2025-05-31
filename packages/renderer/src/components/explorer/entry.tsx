import { EDirent } from '@lib/types';
import { stripFileExtension } from '../../lib/utils/strip-file-extension';
import DrawIcon from '@mui/icons-material/Draw';
import FolderIcon from '@mui/icons-material/Folder';

interface ExplorerEntryProps {
  dirent: EDirent;
  onDirentClick: (dirent: EDirent) => void;
}

export const ExplorerEntry = ({ dirent, onDirentClick }: ExplorerEntryProps) => {
  return (
    <div
      className="items-center w-full gap-x-6 max-h-10 flex flex-row"
      onClick={() => onDirentClick(dirent)}
    >
      {dirent.isDirectory ? <FolderIcon/> : <DrawIcon/>}
      <p>{dirent.isDirectory ? dirent.name : stripFileExtension(dirent.name)}</p>
    </div>
  );
};
