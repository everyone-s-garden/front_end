import React, { useCallback, useState } from 'react';

const useSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSelect = useCallback(() => setIsOpen(true), []);
  const closeSelect = useCallback(() => setIsOpen(false), []);
  const toggleSelect = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, openSelect, closeSelect, toggleSelect };
};

export default useSelect;
