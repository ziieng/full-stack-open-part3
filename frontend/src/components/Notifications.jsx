const Notifications = ({successMessage, errorMessage}) => {
  if (!successMessage && !errorMessage) {
    return null;
  }

  return (
    <>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  )
}

export default Notifications;