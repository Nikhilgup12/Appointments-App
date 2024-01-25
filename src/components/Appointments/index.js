import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

const initialAppointmentList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentList,
    name: ' ',
    date: ' ',
    isStarred: false,
  }

  onTitle = event => {
    this.setState({name: event.target.value})
  }

  onDate = event => {
    this.setState({
      date: format(new Date(event.target.value), 'dd MMMM yyyy, EEEE'),
    })
  }

  appointments = event => {
    event.preventDefault()
    const {name, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      name,
      date,
      isStar: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      name: ' ',
      date: ' ',
    }))
  }

  onStarBtn = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {
            ...eachAppointment,
            isStar: !eachAppointment.isStar,
          }
        }
        return eachAppointment
      }),
    }))
  }

  onStarred = () => {
    this.setState(prevState => ({
      isStarred: !prevState.isStarred,
    }))
  }

  render() {
    const {appointmentsList, isStarred, name, date} = this.state
    const starred = isStarred ? 'starred' : ''
    const filteredAppointmentsList = isStarred
      ? appointmentsList.filter(each => each.isStar === true)
      : appointmentsList

    return (
      <div className="appointment-main-container">
        <div className="appointment-container">
          <div className="appointment-input-image-container">
            <div>
              <h1 className="appointment-main-heading"> Add Appointment </h1>
              <form onSubmit={this.appointments}>
                <label htmlFor="title" className="title-label">
                  Title
                </label>
                <br />
                <input
                  type="text"
                  value={name}
                  id="title"
                  placeholder="Title"
                  className="title-input"
                  onChange={this.onTitle}
                />
                <br />
                <label htmlFor="date" className="date-label">
                  Date
                </label>
                <br />
                <input
                  type="date"
                  value={date}
                  id="date"
                  className="date-input"
                  onChange={this.onDate}
                />
                <div>
                  <button className="btn" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                className="image"
                alt="appointments"
              />
            </div>
          </div>
          <div className="appointment">
            <p className="appointment-list-heading">Appointments</p>
            <button
              className={`btn-starred ${starred}`}
              onClick={this.onStarred}
              type="button"
            >
              {' '}
              Starred{' '}
            </button>
          </div>
          <ul className="appointmentsList-container">
            {filteredAppointmentsList.map(each => (
              <AppointmentItem
                appointmentDetail={each}
                key={each.id}
                onStarBtn={this.onStarBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
