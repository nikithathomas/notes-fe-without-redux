import PropTypes from 'prop-types'
import { useState } from 'react'

import noteService from '../services/notes'
import loginService from '../services/login'

const loginForm = ({ handleLogin,handleErrors }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      noteService.setToken(user.jwtToken)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      handleLogin(user)
    } catch (error) {
      handleErrors('wrong credentials')
    }
  }
  return (
    <form onSubmit={submitLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          className="login__username"
          name="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          className="login__password"
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit" className="login__submit">
        Submit Login
      </button>
    </form>
  )
}

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleErrors: PropTypes.func.isRequired,
}
export default loginForm
