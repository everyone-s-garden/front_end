import React from 'react';

const Margin = ({ height }: { height: number }) => {
  return <div style={{ marginTop: height / 2, marginBottom: height / 2 }}></div>;
};

export default Margin;
