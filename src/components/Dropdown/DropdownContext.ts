import { createContext } from 'react';

interface DropdownContextProps {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

export default DropdownContext;
