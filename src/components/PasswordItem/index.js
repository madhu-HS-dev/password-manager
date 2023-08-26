import './index.css'

const PasswordItem = props => {
  const {passwordItemDetails, onDeletePasswordItem, passwordStatus} = props
  const {
    id,
    website,
    username,
    password,
    initialBackgroundClassName,
  } = passwordItemDetails

  const onDeleteItem = () => {
    onDeletePasswordItem(id)
  }

  const firstLetter = website ? website[0].toUpperCase() : ''
  return (
    <li className="list-container">
      <div className={`initial ${initialBackgroundClassName}`}>
        <p className="first-letter">{firstLetter}</p>
      </div>
      <div>
        <p className="website">{website}</p>
        <p className="website">{username}</p>
        {passwordStatus ? (
          <p className="website">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button
        type="button"
        className="button"
        onClick={onDeleteItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordItem
