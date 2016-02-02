import React, { Component, PropTypes } from 'react'
import Alert from '../../common/components/Alert'
import Button from '../../common/components/Button'

export default class AddNewPing extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Add a new ping
                </div>
                <div className="card-block">
                    <div className="card-text">

                        <Alert type="danger" message={ this.props.errorMessage } />

                        <div className="form-group row">
                            <label htmlFor="ping-name" className="col-sm-3 form-control-label">Name</label>
                            <div className="col-sm-9">
                                <input className="form-control" type='text' ref='input' id="ping-name" onKeyDown={(e) => this.handleKeyDown(e)} />
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
        const node = this.refs.input
        const name = node.value.trim()
        this.props.onAddClick(name)
        node.value = ''
    }

    handleClick(e) {
        this.submitForm(e)
    }

    handleKeyDown(evt) {
        if (evt.keyCode == 13 ) {
            return this.submitForm()
        }
    }
}

AddNewPing.propTypes = {
    onAddClick: PropTypes.func.isRequired
}
