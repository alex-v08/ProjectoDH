'use client'

import { createContext, use, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useRouter } from 'next/navigation'

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const signup = async (email, password, displayName) => {
    try {
      // Crea el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Actualiza el displayName
      await updateProfile(userCredential.user, { displayName: displayName })

      // Construye un objeto con los datos del usuario
      const userData = {
        uuid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName.split(' ')[0],
        role: 'USER_DEFAULT',
        lastName: userCredential.user.displayName.split(' ')[1],
        active: true
      }

      console.log(userData)

      const hostUrl = process.env.NEXT_PUBLIC_HOST_URL // Realiza una solicitud POST a tu endpoint personalizado

      const response = await fetch(`${hostUrl}/users/createfb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (response.ok) {
        // La solicitud POST fue exitosa
        return userCredential.user
      } else {
        // Manejar errores en la solicitud POST, por ejemplo:
        console.error('Error en la solicitud POST al endpoint personalizado')
        throw new Error('Error en la solicitud POST')
      }
    } catch (error) {
      // Maneja los errores al crear el usuario o al actualizar el displayName
      console.error(
        'Error al crear el usuario o actualizar el displayName:',
        error
      )
      throw error
    }
  }

  const sendEmail = () => {
    return sendEmailVerification(auth.currentUser)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, googleProvider)

      const userData = {
        uuid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName.split(' ')[0],
        role: 'USER_DEFAULT',
        lastName: userCredential.user.displayName.split(' ')[1],
        active: true
      }

      const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

      const response = await fetch(`${hostUrl}/users/uid/${userData.uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(response)

      if (response.ok) {
        // La respuesta del servidor es exitosa, ahora verifica el valor booleano
        const data = await response.json()

        if (data === true) {
          // El usuario ya existe en la base de datos, no es necesario guardarlo nuevamente.
          console.log('El usuario existe')
          console.log(userData)
          return userCredential.user
        } else if (data === false) {
          // El usuario no existe en la base de datos, guárdalo en el endpoint personalizado.
          console.log('El usuario no existe')
          console.log(userData)
          const createResponse = await fetch(`${hostUrl}/users/createfb`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          })

          if (createResponse.ok) {
            // La solicitud POST fue exitosa
            return userCredential.user
          } else {
            // Manejar errores en la solicitud POST, por ejemplo:
            console.error(
              'Error en la solicitud POST al endpoint personalizado'
            )
            throw new Error('Error en la solicitud POST')
          }
        } else {
          // Manejar otros posibles valores de respuesta si es necesario
          console.error('Respuesta inesperada del servidor')
          throw new Error('Respuesta inesperada del servidor')
        }
      } else {
        // Manejar errores en la solicitud GET, por ejemplo:
        console.error('Error en la solicitud GET al endpoint')
        throw new Error('Error en la solicitud GET')
      }
    } catch (error) {
      // Maneja los errores al autenticar con Google
      console.error('Error al autenticar con Google:', error)
      throw error
    }
  }

  const logout = async () => {
    await signOut(auth)
    router.push('/')
  }

  const resetPassword = async email => sendPasswordResetEmail(auth, email)

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, currentUser => {
      // console.log({ currentUser })
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubuscribe()
  }, [])

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        sendEmail
      }}
    >
      {children}
    </authContext.Provider>
  )
}
