import Togglable from './Togglable'
import LoginForm from './LoginForm'

const Home = ({ user, ...homeData }) => {
  if (user === null) {
    const {
      username,
      password,
      handleLogin,
      handleUsernameChange,
      handlePasswordChange,
    } = homeData
    return (
      <Togglable buttonLabel="Login">
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </Togglable>
    )
  } else {
    return <p>{user.name} logged in</p>
  }
}

export default Home
