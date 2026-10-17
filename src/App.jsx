import { useState, useEffect } from 'react'
import { signup, login, logout, getUser, handleAuthCallback } from '@netlify/identity'
import './App.css'

const MOCK_USERS = [
  { id: 1, name: 'Amina from Nairobi', age: 25, bio: 'Love hiking and chai. Looking for genuine connection.', distance: 2.3, county: 'Nairobi', interests: ['travel', 'music'], photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Kevin from Kiambu', age: 28, bio: 'Software dev by day, football by night.', distance: 5.1, county: 'Kiambu', interests: ['sports', 'tech'], photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Grace from Mombasa', age: 23, bio: 'Beach lover, student mode active.', distance: 12.0, county: 'Mombasa', interests: ['beach', 'food'], photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 4, name: 'David from Kisumu', age: 30, bio: 'Professional mode. Church on Sundays.', distance: 8.7, county: 'Kisumu', interests: ['faith', 'business'], photo: 'https://randomuser.me/api/portraits/men/45.jpg' },
]

function App() {
  const [user, setUser] = useState(null)
  const [location, setLocation] = useState(null)
  const [profiles, setProfiles] = useState(MOCK_USERS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    handleAuthCallback().then(result => {
      if (result) setUser(result.user)
    })
    getUser().then(u => setUser(u))

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => console.log('Location denied', err)
      )
    }
  }, [])

  const handleSignup = async () => {
    try {
      const u = await signup(email, password)
      setUser(u)
    } catch (e) { alert(e.message) }
  }

  const handleLogin = async () => {
    try {
      await login(email, password)
      const u = await getUser()
      setUser(u)
    } catch (e) { alert(e.message) }
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  const swipe = (like) => {
    if (like) {
      setMatches(prev => [...prev, profiles[currentIndex]])
    }
    setCurrentIndex(prev => prev + 1)
  }

  if (!user) {
    return (
      <div className="auth">
        <h1>🇰🇪 Kenya Connect</h1>
        <p>Location-based dating for Kenya</p>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Sign Up</button>
        <p>Enable Identity in Netlify dashboard to use auth.</p>
      </div>
    )
  }

  const current = profiles[currentIndex]
  if (!current) {
    return (
      <div>
        <h2>No more profiles nearby!</h2>
        <p>Matches: {matches.length}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div className="app">
      <header>
        <h1>Kenya Nearby Dating</h1>
        <p>Welcome, {user.email}</p>
        {location && <p>Your location: {location.lat.toFixed(2)}, {location.lng.toFixed(2)}</p>}
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="card">
        <img src={current.photo} alt={current.name} />
        <h2>{current.name}, {current.age}</h2>
        <p>{current.bio}</p>
        <p>📍 {current.distance} km away • {current.county}</p>
        <p>Interests: {current.interests.join(', ')}</p>
        <div className="actions">
          <button className="nope" onClick={() => swipe(false)}>❌ Pass</button>
          <button className="like" onClick={() => swipe(true)}>❤️ Like</button>
        </div>
      </div>

      {matches.length > 0 && (
        <div className="matches">
          <h3>Your Matches ({matches.length})</h3>
          <ul>
            {matches.map(m => <li key={m.id}>{m.name}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
