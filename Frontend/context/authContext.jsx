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
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName.split(' ')[0],
        lastName: userCredential.user.displayName.split(' ')[1]
      }

      console.log(userData)

      const hostUrl = process.env.NEXT_PUBLIC_HOST_URL // Realiza una solicitud POST a tu endpoint personalizado

      const response = await fetch(`${hostUrl}/api/users/createfb`, {
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

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
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
