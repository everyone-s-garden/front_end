import { useState, useEffect } from 'react';

function useResponsivePath() {
  const [path, setPath] = useState(window.innerWidth > 600 ? '/my/my_gardens/like' : '/my');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setPath('/my');
      } else {
        setPath('/my/my_gardens/like');
      }
    };

    window.addEventListener('resize', handleResize);

    // 처음 마운트될 때도 한 번 실행
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return path;
}

export default useResponsivePath;
