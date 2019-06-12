import React from 'react'
import moment from 'moment'
import { connect } from "react-redux"
import { CSVLink } from "react-csv"

import CanvasJSReact from "../externals/canvasjs.react"
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const mapStateToProps = state => ({
  user: state.user,
  tickets: state.tickets,
  users: state.users
});

const ShareDashboard = (props) => {
  let userData = [
    {label: moment().subtract(5, 'month').format('MMMM'), y: 0},
    {label: moment().subtract(4, 'month').format('MMMM'), y: 0},
    {label: moment().subtract(3, 'month').format('MMMM'), y: 0},
    {label: moment().subtract(2, 'month').format('MMMM'), y: 0},
    {label: moment().subtract(1, 'month').format('MMMM'), y: 0},
    {label: moment().format('MMMM'), y: 0}
  ]
  let userExport = [
    ["name", "email", "title", "organization", "use", "joined"]
  ]
  let ticketData = [
    {label: moment().subtract(5, 'month').format('MMMM'), y: 0},
    {label: moment().subtract(4, 'month').format('MMMM'), y: 0},
    {label: moment().subtract(3, 'month').format('MMMM'), y: 0},
    {label: moment().subtract(2, 'month').format('MMMM'), y: 0},
    {label: moment().subtract(1, 'month').format('MMMM'), y: 0},
    {label: moment().format('MMMM'), y: 0}
  ]
  let ticketExport = [
    ["user", "staff", "added", "status", "kind", "last_note"]
  ]

  for (let i=0; i<props.users.length;i++) {
    userExport.push([
      props.users[i].name,
      props.users[i].email,
      props.users[i].title,
      props.users[i].organization,
      props.users[i].use,
      moment(props.users[i].joined).format('MMM Do YYYY')
    ])
    if (moment(props.users[i].joined).isBetween(moment().startOf("month"), moment().endOf("month"))) {
      userData[5].y+=1
    }
    if (moment(props.users[i].joined).isBetween(moment().subtract(1, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      userData[4].y+=1
    }
    if (moment(props.users[i].joined).isBetween(moment().subtract(2, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      userData[3].y+=1
    }
    if (moment(props.users[i].joined).isBetween(moment().subtract(3, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      userData[2].y+=1
    }
    if (moment(props.users[i].joined).isBetween(moment().subtract(4, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      userData[1].y+=1
    }
    if (moment(props.users[i].joined).isBetween(moment().subtract(5, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      userData[0].y+=1
    }
  }

  for (let i=0; i<props.tickets.length;i++) {
    ticketExport.push([
      props.tickets[i].user,
      props.tickets[i].staff,
      moment(props.tickets[i].added).format('MMM Do YYYY'),
      props.tickets[i].status,
      props.tickets[i].kind,
      props.tickets[i].log[props.tickets[i].log.length-1] ? props.tickets[i].log[props.tickets[i].log.length-1].note : 'Created'
    ])
    if (moment(props.tickets[i].added).isBetween(moment().startOf("month"), moment().endOf("month"))) {
      ticketData[5].y+=1
    }
    if (moment(props.tickets[i].added).isBetween(moment().subtract(1, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      ticketData[4].y+=1
    }
    if (moment(props.tickets[i].added).isBetween(moment().subtract(2, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      ticketData[3].y+=1
    }
    if (moment(props.tickets[i].added).isBetween(moment().subtract(3, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      ticketData[2].y+=1
    }
    if (moment(props.tickets[i].added).isBetween(moment().subtract(4, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      ticketData[1].y+=1
    }
    if (moment(props.tickets[i].added).isBetween(moment().subtract(5, 'months').startOf("month"), moment().subtract(5, 'months').endOf("month"))) {
      ticketData[0].y+=1
    }
  }
  console.log(ticketExport)

  const options = {
    title: {
      text: "Activity (Past 6 Months)"
    },
    data: [{
      name: "New Users",
      type: "spline",
      showInLegend: true,
      dataPoints: userData
    },
    {
      name: "Tickets",
      type: "spline",
      showInLegend: true,
      dataPoints: ticketData
    }]
  }



  return (
  <section>
    <header>
      <h1>Welcome {props.user && props.user.name}</h1>
    </header>
    <section className="Content flexible">
      <article>
        <CanvasJSChart options={options} />
        <CSVLink className="button" data={userExport}>Download User Data</CSVLink>
        <CSVLink className="button" data={ticketExport}>Download Ticket Data</CSVLink>
      </article>

    </section>
  </section>
)};

export default connect(
  mapStateToProps,
  {}
)(ShareDashboard);
