import { useContext } from 'react';
import DropdownContext from './DropdownContext';

const useDropdown = () => {
  const dropdown = useContext(DropdownContext);

  if (!dropdown) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }

  return dropdown;
};

export default useDropdown;
