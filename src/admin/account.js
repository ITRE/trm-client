import React from 'react'
import { connect } from "react-redux"
import Swal from 'sweetalert2'

import ACTIONS from "../modules/action"
import UserForm from "../partial/userForm"

const mapStateToProps = state => ({
  user: state.user
})

const Account = (props) => {
  const send = (values) => {
    props.updateUser(values).then(res => {
      Swal.fire({
        title: 'Submitted!',
        type: 'success',
        text: 'Your user information has been saved.',
      }).then(res=>{
        if(res) {
          props.history.goBack()
        }
      })
    })
  }
  return (
    <main className="wrapper">
      <section className="back_holder">
        <button className="link" onClick={()=>{props.history.goBack()}}>Back</button>
      </section>
      <section>
        <h1>Account Details</h1>
        <UserForm account={true} history={props.history} send={send} initial={{
          username: props.user.username,
          password: '',
          confirm: '',
          name: props.user.name,
          email: props.user.email,
          role: props.user.role,
          admin: '',
          admingPass: ''
        }}/>
      </section>
    </main>
  )
}

export default connect(
  mapStateToProps,
  {updateUser: ACTIONS.updateUser}
)(Account);
