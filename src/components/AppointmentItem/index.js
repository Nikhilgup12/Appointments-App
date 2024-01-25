import './index.css'

const AppointmentItem = props => {
  const {appointmentDetail, onStarBtn} = props
  const {name, date, isStar, id} = appointmentDetail
  const onClickStar = () => {
    onStarBtn(id)
  }

  const isStartoggle = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointments-item-container">
      <div className="appointments-item">
        <h1 className="appointments-name"> {name} </h1>
        <button
          type="button"
          data-testid="star"
          aria-label="star"
          className="appointments-star-btn"
          onClick={onClickStar}
        >
          <img src={isStartoggle} alt="star" />
        </button>
      </div>
      <p className="appointments-date"> {date} </p>
    </li>
  )
}
export default AppointmentItem
