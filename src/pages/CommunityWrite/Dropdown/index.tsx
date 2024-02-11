import React, { ButtonHTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DropdownContext from './DropdownContext';
import useDropdown from './useDropdown';

interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

interface MenuProps {
  top: number;
}

interface ItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Dropdown = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onOpen = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <DropdownContext.Provider value={{ visible, onClose, onOpen }}>
      <DropdownContainer>{children}</DropdownContainer>
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children, ...rest }: PropsWithChildren<TriggerProps>) => {
  const { onOpen } = useDropdown();

  return (
    <DropdownTrigger type="button" onClick={onOpen} {...rest}>
      {children}
    </DropdownTrigger>
  );
};

const Menu = ({ children, top }: PropsWithChildren<MenuProps>) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const { visible, onClose } = useDropdown();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <DropdownMenu ref={menuRef} top={top} visible={visible}>
      {children}
    </DropdownMenu>
  );
};

const Item = ({ children, ...rest }: PropsWithChildren<ItemProps>) => {
  const { onClose, visible } = useDropdown();

  return (
    <DropdownItem type="button" onClick={onClose} {...rest}>
      {children}
    </DropdownItem>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DropdownTrigger = styled.button``;

const DropdownMenu = styled.ul<MenuProps & { visible: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: ${({ top }) => top}px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  z-index: 10;
  background-color: white;
  width: 120px;
  border-radius: 10px;
  & li:first-child button {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  & li:last-child button {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom: none;
  }
`;

const DropdownItem = styled.button`
  &:hover {
    background-color: ${({ theme }) => theme.colors.orange[100]};
  }

  & {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }

  width: 100%;
  padding: 15px;
  font-size: 16px;
`;
