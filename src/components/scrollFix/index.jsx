import { useEffect, useState } from 'react';

function ScrollFix() {
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop < lastScrollTop) {
        window.scrollTo(0, 0);
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return null;
}

export default ScrollFix;