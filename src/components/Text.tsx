import React, { ReactNode } from 'react';
import styled from 'styled-components';
interface TextProps {
  children: ReactNode | string;
  size: number;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
  fontWeight?: number;
}
type TextStyleProps = Omit<TextProps, 'value'>;

const Text = ({
  children,
  size,
  marginTop = 0,
  marginLeft = 0,
  marginBottom = 0,
  marginRight = 0,
  fontWeight = 400,
}: TextProps) => {
  return (
    <TextStyle
      size={size}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginBottom={marginBottom}
      marginRight={marginRight}
      style={{ fontWeight: `${fontWeight}px` }}
    >
      {children}
    </TextStyle>
  );
};

const TextStyle = styled.div<TextStyleProps>`
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-right:${({ marginRight }) => `${marginRight}px`};
  margin-bottom:${({ marginBottom }) => `${marginBottom}px`};
  margin-left:${({ marginLeft }) => `${marginLeft}px`};
  font-size: ${({ size }) => `${size}px`}};
`;

export default Text;
