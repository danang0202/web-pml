import { useEffect } from 'react';
import Swal from 'sweetalert2';

function NotifCenter({icon,text}) {
  useEffect(() => {
    Swal.fire({
      icon: icon,
      title: text,
      showConfirmButton: false,
      timer: 1000
    });
  }, []); 

  return null; 
}

export default NotifCenter;
