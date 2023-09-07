'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const HeartButton = ({fillColor, behaivour, productId}) => {
  const [idUser, setIdUser] = useState(0);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { user } = useAuth();
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

  // Función para obtener el ID a partir del UID
  const fetchUserId = async () => {
    try {
      const response = await fetch(`${hostUrl}/users/list/uuid?uuid=${user.uid}`);
      if (response.ok) {
        const userData = await response.json();
        setIdUser(userData[0].id);
        return idUser;
      } else {
        // Maneja los errores de la solicitud aquí.
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo el ID del usuario: ', error);
      return null;
    }
  };

  useEffect(() => {
    // Carga los productos favoritos del usuario al iniciar sesión
    if (user) {
      fetchUserId().then((idUser) => {
          fetchFavoriteProducts(idUser);
      });
    }
  }, [user]);

 // Función para cargar los productos favoritos del usuario
 const fetchFavoriteProducts = async (idUser) => {
  try {
    const response = await fetch(`${hostUrl}/api/favorites/findByUserId/${idUser}`);
    if (response.ok) {
      const jsonData = await response.json();
      const favoriteIds = jsonData.map((item) => item.product.id);
      setFavoriteProducts(favoriteIds);
    } else {
      // Maneja los errores de la solicitud aquí.
    }
  } catch (error) {
    console.error('Error cargando los productos favoritos: ', error);
  }
};

// Función para marcar o desmarcar un producto como favorito
const toggleFavorite = (e, productId) => {
  e.preventDefault();
  if (!user) {
    // Si el usuario no inició sesión, muestra una alerta
    Swal.fire({
      icon: 'info',
      title: 'Inicia sesión',
      text: 'Inicia sesión para agregar productos a favoritos.',
      showConfirmButton: true,
    });
    return;
  } 
  try {
    // Verifica si el producto ya está en la lista de favoritos
    if (favoriteProducts.includes(productId)) {
      // Si está en favoritos, lo saca
      const response = fetch(`${hostUrl}/api/favorites/delete?userId=${idUser}&productId=${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Lo elimina y actualiza el estado
        setFavoriteProducts((prevFavorites) => prevFavorites.filter((id) => id !== productId));
      } else {
        // Maneja los errores de la solicitud aquí.
      }
    } else {
      // Si no está en favoritos, lo agrega
      const response = fetch(`${hostUrl}/api/favorites/add?userId=${idUser}&productId=${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Lo agrega y actualiza el estado
        setFavoriteProducts((prevFavorites) => [...prevFavorites, productId]);
      } else {
        // Maneja los errores de la solicitud aquí.
      }
    }
  }
  catch (error) {
    console.error('Error al marcar/desmarcar producto como favorito: ', error);
}
};

  return (
      <button
        onClick={(e) => toggleFavorite(e, productId)}
        className='cursor-pointer'
        key={productId}
      >
        {favoriteProducts.includes(productId) ? (
            <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='block'>
                <path d="M10.9642 2.72821C10.3939 2.14676 9.71368 1.68446 8.96312 1.36816C8.21256 1.05187 7.40661 0.88789 6.59211 0.885763C5.77761 0.883636 4.97082 1.0434 4.21861 1.35577C3.4664 1.66815 2.78379 2.12689 2.21045 2.70536C-0.201226 5.14107 -0.189797 9.09965 2.23331 11.5468L11.2014 20.604C11.5728 20.9797 12.1758 20.9797 12.5472 20.604L21.4696 11.5982C22.6271 10.4169 23.2733 8.82773 23.2688 7.17396C23.2642 5.52018 22.6092 3.93457 21.4453 2.75964C20.8744 2.17708 20.1933 1.71388 19.4417 1.397C18.69 1.08013 17.8829 0.915922 17.0672 0.913928C16.2515 0.911934 15.4435 1.0722 14.6903 1.38539C13.9372 1.69858 13.2538 2.15845 12.6801 2.73821L11.8286 3.59964L10.9642 2.72821Z" fill={fillColor}/>
            </svg>
        ):(
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={behaivour}>
                <path d="M12.5456 19.7182L21.4668 10.7128C22.6241 9.5315 23.2703 7.94236 23.2658 6.28863C23.2612 4.6349 22.6063 3.04934 21.4425 1.87445C20.8716 1.29207 20.1906 0.829043 19.439 0.512291C18.6875 0.19554 17.8805 0.0313927 17.065 0.0293987C16.2494 0.0274047 15.4416 0.187604 14.6886 0.500676C13.9355 0.813749 13.2522 1.27344 12.6785 1.85302L11.8271 2.71443L10.9628 1.84302C10.3927 1.26142 9.71259 0.798971 8.96212 0.482575C8.21164 0.166179 7.40574 0.00214778 6.5913 2.09513e-05C5.77686 -0.00210588 4.97011 0.157714 4.21799 0.470186C3.46587 0.782658 2.78338 1.24155 2.21021 1.82017C-0.201146 4.25581 -0.189718 8.21427 2.23307 10.6613L11.2 19.7182C11.5714 20.0939 12.1742 20.0939 12.5456 19.7182ZM13.6942 2.85728C14.1352 2.41212 14.6604 2.05917 15.2391 1.819C15.8179 1.57883 16.4387 1.45623 17.0653 1.45836C17.6919 1.46049 18.3118 1.58729 18.889 1.83139C19.4661 2.07548 19.9889 2.43199 20.4268 2.88013C21.3257 3.78774 21.8318 5.01227 21.8361 6.28964C21.8404 7.56702 21.3425 8.79491 20.4497 9.70851V9.71137L11.8728 18.3683L3.24733 9.65565C1.37167 7.76142 1.37024 4.69865 3.2259 2.82442C3.66634 2.38008 4.19078 2.0278 4.76867 1.78809C5.34657 1.54838 5.96638 1.42603 6.59202 1.42815C7.21765 1.43028 7.83662 1.55685 8.41287 1.80048C8.98912 2.04412 9.51115 2.39996 9.94856 2.84728L11.32 4.23295C11.3864 4.30012 11.4655 4.35344 11.5526 4.38983C11.6398 4.42622 11.7333 4.44495 11.8278 4.44495C11.9223 4.44495 12.0158 4.42622 12.103 4.38983C12.1901 4.35344 12.2692 4.30012 12.3356 4.23295L13.6942 2.85728Z" fill={fillColor}/>
            </svg>
        )}
      </button>
  );
};

export default HeartButton;







// 'use client'

// import {useState, useEffect} from 'react';
// import { useAuth } from '@/context/authContext';

// const HeartButton = ({fillColor, behaivour, productId}) => {
//     const [isFav, setIsFav] = useState(false);
//     const [userId, setUserId] = useState(0);
//     const [favoriteProducts, setFavoriteProducts] = useState([]);

//     const { user } = useAuth();
    
//     const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;
//     const urlAddFav = `${hostUrl}/api/favorites/add?userId=${userId}&productId=${productId}`
//     const urlDeleteFav = `${hostUrl}/api/favorites/delete?userId=${userId}&productId=${productId}`
   
//     useEffect(() => {
//     const fetchUserId = async () => {
//             try {
//               const response = await fetch(`${hostUrl}/users/list/{uuid}?uuid=${user.uid}`)
//             //   console.log(user.uid)
//               if (response.ok) {
//                 const userData = await response.json()
//                 // console.log(userData[0].id)
//                 setUserId(userData[0].id)
//                 // Carga los productos favoritos del usuario al iniciar sesión
//                 fetchFavoriteProducts(userId)
//               } else {
//                 // Maneja los errores de la solicitud aquí.
//               }
//             } catch (error) {
//               console.error(error.message)
//             }
//          }
//          if (user) {
//             fetchUserId()            
//           }
//         }, [user])

//     const fetchFavoriteProducts = async (userId) => {
//       try {
//         const response = await fetch(`${hostUrl}/api/favorites/findByUserId/${userId}`);
//         if (response.ok) {
//           const jsonData = await response.json();
//           const favoriteIds = jsonData.map((item) => item.product.id);
//           setFavoriteProducts(favoriteIds);
//         } else {
//         }
//       } catch (error) {
//         console.error('Error cargando los productos favoritos: ', error);
//       }
//     };
          
//     const handleAddToFavorites = async () => {
//       try {
//         const response = await fetch(urlAddFav, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
  
//         if (!response.ok) {
//           throw new Error(
//             'Error al intentar agregar el producto a favoritos. Response: ' +
//               response.status
//           );
//         } else {
//           // Maneja la respuesta exitosa aquí, si es necesario
//         }
//       } catch (error) {
//         console.error('Error al intentar agregar el producto a favoritos:', error);
//       }
//     };

//     const handleDeleteFav = async (productId) => {
//         try {
//             const response = await fetch(`${hostUrl}/api/favorites/delete?userId=${userId}&productId=${productId}`, {
//               method: 'DELETE',
//               headers: {
//                 'Content-Type': 'application/json'
//               }
//             });
      
//             if (!response.ok) {
//               throw new Error(
//                 'Error al intentar eliminar el producto de favoritos. Response: ' +
//                   response.status
//               );
//             } else {
//               setFavoriteProducts((prevFavorites) => prevFavorites.filter((id) => id !== productId));
//             }
//           } catch (error) {
//             console.error('Error al intentar eliminar el producto de favoritos:', error);
//           }
//     }
      
//     const toggleFav = async (e, productId) => {
//         e.preventDefault();
//         if (user){
//           if (favoriteProducts.includes(productId)) {
//             handleDeleteFav(productId)
//           }



//             // if (!isFav) {
//             //     setIsFav(true)
//             //     handleAddToFavorites();
//             // }
//             // else {
//             //     setIsFav(false)
//             //     handleDeleteFav();
//             // }


//         } else {
//             alert("Iniciá sesión y guardá tus productos favoritos!")
//         }
//     };

//     return (
//         <button
//             onClick={toggleFav(productId)}
//             className='cursor-pointer'
//         >
//             {isFav ? (
//                 <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M10.9642 2.72821C10.3939 2.14676 9.71368 1.68446 8.96312 1.36816C8.21256 1.05187 7.40661 0.88789 6.59211 0.885763C5.77761 0.883636 4.97082 1.0434 4.21861 1.35577C3.4664 1.66815 2.78379 2.12689 2.21045 2.70536C-0.201226 5.14107 -0.189797 9.09965 2.23331 11.5468L11.2014 20.604C11.5728 20.9797 12.1758 20.9797 12.5472 20.604L21.4696 11.5982C22.6271 10.4169 23.2733 8.82773 23.2688 7.17396C23.2642 5.52018 22.6092 3.93457 21.4453 2.75964C20.8744 2.17708 20.1933 1.71388 19.4417 1.397C18.69 1.08013 17.8829 0.915922 17.0672 0.913928C16.2515 0.911934 15.4435 1.0722 14.6903 1.38539C13.9372 1.69858 13.2538 2.15845 12.6801 2.73821L11.8286 3.59964L10.9642 2.72821Z" fill={fillColor}/>
//                 </svg>
//             ):(
//                 <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={behaivour}>
//                     <path d="M12.5456 19.7182L21.4668 10.7128C22.6241 9.5315 23.2703 7.94236 23.2658 6.28863C23.2612 4.6349 22.6063 3.04934 21.4425 1.87445C20.8716 1.29207 20.1906 0.829043 19.439 0.512291C18.6875 0.19554 17.8805 0.0313927 17.065 0.0293987C16.2494 0.0274047 15.4416 0.187604 14.6886 0.500676C13.9355 0.813749 13.2522 1.27344 12.6785 1.85302L11.8271 2.71443L10.9628 1.84302C10.3927 1.26142 9.71259 0.798971 8.96212 0.482575C8.21164 0.166179 7.40574 0.00214778 6.5913 2.09513e-05C5.77686 -0.00210588 4.97011 0.157714 4.21799 0.470186C3.46587 0.782658 2.78338 1.24155 2.21021 1.82017C-0.201146 4.25581 -0.189718 8.21427 2.23307 10.6613L11.2 19.7182C11.5714 20.0939 12.1742 20.0939 12.5456 19.7182ZM13.6942 2.85728C14.1352 2.41212 14.6604 2.05917 15.2391 1.819C15.8179 1.57883 16.4387 1.45623 17.0653 1.45836C17.6919 1.46049 18.3118 1.58729 18.889 1.83139C19.4661 2.07548 19.9889 2.43199 20.4268 2.88013C21.3257 3.78774 21.8318 5.01227 21.8361 6.28964C21.8404 7.56702 21.3425 8.79491 20.4497 9.70851V9.71137L11.8728 18.3683L3.24733 9.65565C1.37167 7.76142 1.37024 4.69865 3.2259 2.82442C3.66634 2.38008 4.19078 2.0278 4.76867 1.78809C5.34657 1.54838 5.96638 1.42603 6.59202 1.42815C7.21765 1.43028 7.83662 1.55685 8.41287 1.80048C8.98912 2.04412 9.51115 2.39996 9.94856 2.84728L11.32 4.23295C11.3864 4.30012 11.4655 4.35344 11.5526 4.38983C11.6398 4.42622 11.7333 4.44495 11.8278 4.44495C11.9223 4.44495 12.0158 4.42622 12.103 4.38983C12.1901 4.35344 12.2692 4.30012 12.3356 4.23295L13.6942 2.85728Z" fill={fillColor}/>
//                 </svg>
//             )}
//         </button>
//      )
// }

// export default HeartButton