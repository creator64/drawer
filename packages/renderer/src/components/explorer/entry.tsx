import { EDirent } from '@lib/types';
import folderIcon from '../../assets/folder-solid.svg';

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
      <img className={`${dirent.isDirectory ? '' : 'invisible'} h-8 w-8`} src={folderIcon} alt="" />
      <p>{dirent.name}</p>
    </div>
  );
};
