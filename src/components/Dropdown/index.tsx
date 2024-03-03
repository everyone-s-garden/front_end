import React, { ButtonHTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DropdownContext from './DropdownContext';
import useDropdown from './useDropdown';
import { createPortal } from 'react-dom';

interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

interface MenuProps {
  top: number;
  portal?: '' | 'top' | 'top-right' | 'bottom-right';
  width?: number;
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
      <BackGround />
    </DropdownContext.Provider>
  );
};

const BackGround = ({ children }: PropsWithChildren) => {
  const { onClose, visible } = useDropdown();

  return createPortal(<DropdownBg onClick={onClose} visible={visible} />, document.body);
};

const Trigger = ({ children, ...rest }: PropsWithChildren<TriggerProps>) => {
  const { onOpen } = useDropdown();

  return (
    <DropdownTrigger type="button" onClick={onOpen} {...rest}>
      {children}
    </DropdownTrigger>
  );
};

const Menu = ({ children, top, portal = '', width = 120 }: PropsWithChildren<MenuProps>) => {
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
    <DropdownMenu ref={menuRef} top={top} width={width} portal={portal} visible={visible}>
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
Dropdown.BackGround = BackGround;

export default Dropdown;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;

  @media (${({ theme }) => theme.devices.mobile}) {
    position: relative;
  }
`;

const DropdownTrigger = styled.button`
  & span {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const DropdownMenu = styled.ul<MenuProps & { visible: boolean }>`
  position: fixed;
  z-index: 2;
  background-color: white;
  left: 50%;
  transform: translateX(-50%);
  ${({ portal }) => {
    if (portal === 'top') {
      return 'top: 0; left: 50%; transform: translateX(-50%);';
    }
    if (portal === 'top-right') {
      return 'top: 0; right: 0;';
    }
    if (portal === 'bottom-right') {
      return 'left: 0; transform: none;';
    }
    return 'bottom: 0;';
  }};
  bottom: 0;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  z-index: 300;
  background-color: white;
  width: 100%;
  border-radius: 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  & li:first-child button {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  & li:last-child button {
    border-bottom: none;
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    top: ${({ top }) => top}px;
    position: absolute;
    bottom: auto;
    width: ${({ width }) => width + 'px'};
    border-radius: 10px;

    & li:first-child button {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    & li:last-child button {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`;

const DropdownItem = styled.button`
  &:hover {
    background-color: ${({ theme }) => theme.colors.orange[100]};
  }

  & {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }

  height: 60px;
  width: 100%;
  padding: 15px 0;
  font-size: 16px;

  @media (${({ theme }) => theme.devices.mobile}) {
    height: auto;
  }
`;

const DropdownBg = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  background-color: rgba(20, 20, 20, 0.6);
  z-index: 200;

  @media (${({ theme }) => theme.devices.mobile}) {
    display: none;
  }
`;
