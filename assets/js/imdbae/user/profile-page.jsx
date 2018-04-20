import React from 'react';
import {connect} from "react-redux";
import {UserActionCreators} from "./state-config";
import {getGeoLocation} from "../util/helpers";

class ProfilePageComponent extends React.Component {
  componentWillMount() {
    if (!this.props.currentUser) {
      this.props.history.push('/signUp');
    } else {
      this.props.loadUser(this.props.currentUser.id);
    }
  }

  render() {
    return <div className={'card'}>
      <div className={'card-body'}>
        <div className={'form-group'}>
          <label htmlFor={'email-field'}>Email</label>
          <input id="email-field" className={'form-control'} type="email" autoComplete={'email'}
                 value={this.props.formData.email}
                 onChange={($ev) => {
                   this.props.onChange({fieldName: 'email', fieldValue: $ev.target.value})
                 }}/>
        </div>
        <div className={'form-group'}>
          <label htmlFor={'name-field'}>Name</label>
          <input id="name-field" className={'form-control'} type="text" autoComplete={'name'}
                 value={this.props.formData.name}
                 onChange={($ev) => {
                   this.props.onChange({fieldName: 'name', fieldValue: $ev.target.value})
                 }}/>
        </div>
        <div className={'form-group'}>
          <label htmlFor="distance_select">Select Distance</label>
          <select className={'form-control'} id="distance_select"
                  onChange={$ev => this.props.onChange({fieldName: 'distance', fieldValue: $ev.target.value})}>
            <option value={5} selected={5 === this.props.formData.distance}>Within 5 miles</option>
            <option value={10} selected={10 === this.props.formData.distance}>Within 10 miles</option>
            <option value={15} selected={15 === this.props.formData.distance}>Within 15 miles</option>
            <option value={20} selected={20 === this.props.formData.distance}>Within 20 miles</option>
            <option value={50} selected={50 === this.props.formData.distance}>Within 50 miles</option>
          </select>
        </div>
        <div>
          <label>Location</label>
          {
            this.props.formData.loc_lat
              ?
              <div>
                <dl>
                  <dt>Latitude</dt>
                  <dd>{this.props.formData.loc_lat}</dd>
                  <dt>Longitude</dt>
                  <dd>{this.props.formData.loc_lon}</dd>
                </dl>
              </div>
              :
              <div>
                Location not set
              </div>
          }
          <button className={'btn btn-sm btn-info'} onClick={() => {
            getGeoLocation((loc) => updateLoc(this.props, loc))
          }}>Update Location
          </button>
        </div>
      </div>
      <div className={'card-footer'}>
        <button className={'btn btn-primary'} onClick={() => this.props.submit(this.props.formData)}
                disabled={this.props.formData.formInvalid} type={'button'}>Submit
        </button>
      </div>
    </div>
  }
}

function updateLoc(props, loc) {
  console.log('>>>>> Updating loc val', loc);
  props.onChange({fieldName: 'loc_lat', fieldValue: loc.coords.latitude});
  props.onChange({fieldName: 'loc_lon', fieldValue: loc.coords.longitude});
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  formData: state.user.userForm
});
const mapDispatchToProps = dispatch => ({
  loadUser: userId => dispatch(UserActionCreators.loadUser(userId)),
  onChange: formField => dispatch(UserActionCreators.updateUserForm(formField)),
  submit: user => dispatch(UserActionCreators.updateUser(user))
});

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePageComponent);
