import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // When the path changes, scroll to top
    window.scrollTo(0, 0);
    
    // You can also try these variations if needed:
    // document.documentElement.scrollTop = 0;
    // document.body.scrollTop = 0;
  }, [pathname]);
  
  // This component doesn't render anything
  return null;
}

export default ScrollToTop;