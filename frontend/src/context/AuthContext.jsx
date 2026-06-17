import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { setUnauthorizedHandler } from '../utils/http.jsx'

const TOKEN_KEY = 'token'
const ROLE_KEY = 'role'
const USERNAME_KEY = 'username'

const AuthContext = createContext(null)

function getTokenPayload(token) {
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

function getRoleFromToken(token) {
  return getTokenPayload(token)?.role ?? null
}

function isTokenExpired(token) {
  const payload = getTokenPayload(token)
  if (!payload?.exp) return false
  return Date.now() >= payload.exp * 1000
}

function readStoredAuth() {
  const storedToken = localStorage.getItem(TOKEN_KEY)
  if (!storedToken || isTokenExpired(storedToken)) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
    localStorage.removeItem(USERNAME_KEY)
    return { token: null, role: null, username: null }
  }
  const storedRole = localStorage.getItem(ROLE_KEY)
  return {
    token: storedToken,
    role: storedRole || getRoleFromToken(storedToken),
    username: localStorage.getItem(USERNAME_KEY),
  }
}

let cachedInitialAuth

function getInitialAuth() {
  if (!cachedInitialAuth) {
    cachedInitialAuth = readStoredAuth()
  }
  return cachedInitialAuth
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getInitialAuth().token)
  const [role, setRoleState] = useState(() => getInitialAuth().role)
  const [username, setUsernameState] = useState(() => getInitialAuth().username)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === TOKEN_KEY) setTokenState(e.newValue)
      if (e.key === ROLE_KEY) setRoleState(e.newValue)
      if (e.key === USERNAME_KEY) setUsernameState(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [setTokenState, setRoleState, setUsernameState])
  const login = useCallback((newToken, newUsername, newRole) => {
    const roleValue = newRole ?? getRoleFromToken(newToken)
    localStorage.setItem(TOKEN_KEY, newToken)
    setTokenState(newToken)
    if (newUsername) {
      localStorage.setItem(USERNAME_KEY, newUsername)
      setUsernameState(newUsername)
    }
    if (roleValue) {
      localStorage.setItem(ROLE_KEY, roleValue)
      setRoleState(roleValue)
    }
  }, [])
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
    localStorage.removeItem(USERNAME_KEY)
    setTokenState(null)
    setRoleState(null)
    setUsernameState(null)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout()
      window.location.href = '/login'
    })
    return () => setUnauthorizedHandler(null)
  }, [logout])

  const value = useMemo(
    () => ({
      token,
      role,
      username,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, role, username, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider')
  }
  return ctx
}
