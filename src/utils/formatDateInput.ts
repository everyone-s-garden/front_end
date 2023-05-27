import React from 'react';

const formatDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  let { value } = e.currentTarget;

  // 숫자가 아닌 문제 제거함
  value = value.replace(/\D/g, '');

  // 위치에 따라 .(점) 찍어줌
  if (value.length > 6) {
    value = `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`;
  } else if (value.length > 4) {
    value = `${value.slice(0, 4)}.${value.slice(4, 6)}`;
  }

  e.currentTarget.value = value;
};

export default formatDateInput;
