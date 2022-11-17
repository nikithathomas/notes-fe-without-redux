import PropTypes from 'prop-types'

const loginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        className="login__username"
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        className="login__password"
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit" className="login__submit">Submit Login</button>
  </form>
)

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}
export default loginForm
