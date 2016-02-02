import React, { Component, PropTypes } from 'react'
import Alert from '../../common/components/Alert'
import Button from '../../common/components/Button'

export default class AddNewContact extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Add a new contact
                </div>
                <div className="card-block">
                    <div className="card-text">

                        <Alert type="danger" message={ this.props.errorMessage } />

                        <div className="form-group row">
                            <label htmlFor="ping-name" className="col-sm-3 form-control-label">Name</label>
                            <div className="col-sm-9">
                                <input className="form-control" type='text' ref='name' id="ping-name" onKeyDown={(e) => this.handleKeyDown(e)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="ping-email" className="col-sm-3 form-control-label">Email</label>
                            <div className="col-sm-9">
                                <input className="form-control" type='text' ref='email' id="ping-email" onKeyDown={(e) => this.handleKeyDown(e)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="ping-filter_tags" className="col-sm-3 form-control-label">Filter Tags</label>
                            <div className="col-sm-9">
                                <input className="form-control" type='text' ref='filter_tags' id="ping-filter_tags" onKeyDown={(e) => this.handleKeyDown(e)} />
                            </div>
                        </div>

                        <fieldset className="form-group">
                            <div className="col-sm-offset-3">
                                <Button type="primary" message="Add" onClick={(e) => this.handleClick(e)} />
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }

    submitForm(e) {
        const name = this.refs.name.value.trim()
        const email = this.refs.email.value.trim()
        const filter_tags = this.refs.filter_tags.value.trim().split(',')

        if (name === '') {
            return
        }

        this.props.onAddClick({name, email, filter_tags})

        this.refs.name.value = ''
        this.refs.email.value = ''
        this.refs.filter_tags.value = ''
    }

    handleClick(e) {
        this.submitForm(e)
    }

    handleKeyDown(evt) {
        if (evt.keyCode == 13) {
            return this.submitForm()
        }
    }
}

AddNewContact.propTypes = {
    onAddClick: PropTypes.func.isRequired
}
