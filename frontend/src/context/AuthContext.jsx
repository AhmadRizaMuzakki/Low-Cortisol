import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const TOKEN_KEY = 'token'
const ROLE_KEY = 'role'
const USERNAME_KEY = 'username'

const AuthContext = createContext(null)

function getRoleFromToken(token) {
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.role ?? null
  } catch {
    return null
  }
}

function readStoredRole() {
  const stored = localStorage.getItem(ROLE_KEY)
  if (stored) return stored
  return getRoleFromToken(localStorage.getItem(TOKEN_KEY))
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [role, setRoleState] = useState(readStoredRole)
  const [username, setUsernameState] = useState(localStorage.getItem(USERNAME_KEY))
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
