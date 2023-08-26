import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const initialBackgroundClassNames = [
  'blue',
  'green',
  'orange',
  'pink',
  'red',
  'light - green',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isShow: false,
  }

  onChecked = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onDeletePasswordItem = id => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(each => each.id !== id)

    this.setState({passwordList: filteredPasswordList})
  }

  renderNoPasswordContainer = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-image"
      />
      <p className="no-password">No Passwords</p>
    </div>
  )

  renderPasswordContainer = () => {
    const {passwordList, searchInput, isShow} = this.state
    const filteredItemList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="unordered-List-Container">
        {filteredItemList.map(eachItem => (
          <PasswordItem
            passwordItemDetails={eachItem}
            key={eachItem.id}
            onDeletePasswordItem={this.onDeletePasswordItem}
            passwordStatus={isShow}
          />
        ))}
      </ul>
    )
  }

  onSearchListItem = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const initialBackgroundClassName =
      initialBackgroundClassNames[
        Math.ceil(Math.random() * initialBackgroundClassNames.length - 1)
      ]

    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
      initialBackgroundClassName,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      username: '',
      password: '',
      searchInput: '',
      isShow: false,
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderNewPassword = () => {
    const {website, username, password} = this.state
    return (
      <div className="new-password-card-container">
        <div className="pass-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="new-password-input-container">
          <h1 className="heading">Add New Password</h1>
          <form onSubmit={this.onSubmitPassword}>
            <div className="input-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-image"
                />
              </div>
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-image"
                />
              </div>
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-image"
                />
              </div>
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="btn-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  renderYourPassword = () => {
    const {passwordList, searchInput} = this.state
    return (
      <div className="your-password-container">
        <div className="your-password-search-container">
          <div className="your-password-heading-container">
            <h1 className="your-password-heading">Your Passwords</h1>
            <p className="password-count">{passwordList.length}</p>
          </div>
          <div className="search-input-container">
            <div className="your-password-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-image"
              />
            </div>
            <input
              type="search"
              className="your-password-search-input"
              placeholder="Search"
              onChange={this.onSearchListItem}
              value={searchInput}
            />
          </div>
        </div>
        <hr className="line" />
        <div className="label-container">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkBox"
              className="check-box"
              onChange={this.onChecked}
            />
            <label htmlFor="checkBox" className="label">
              Show Password
            </label>
          </div>
        </div>
        {passwordList.length > 0
          ? this.renderPasswordContainer()
          : this.renderNoPasswordContainer()}
      </div>
    )
  }

  render() {
    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-image"
        />
        {this.renderNewPassword()}
        {this.renderYourPassword()}
      </div>
    )
  }
}

export default PasswordManager
