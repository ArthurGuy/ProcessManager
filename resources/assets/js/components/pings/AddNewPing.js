import React, { Component, PropTypes } from 'react'

export default class AddNewPing extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Add a new ping
                </div>
                <div className="card-block">
                    <div className="card-text">
                        <div className="form-group row">
                            <label htmlFor="ping-name" className="col-sm-3 form-control-label">Name</label>
                            <div className="col-sm-9">
                                <input className="form-control" type='text' ref='input' id="ping-name" />
                            </div>
                        </div>
                        <fieldset className="form-group">
                            <div className="col-sm-offset-3">
                                <button className="btn btn-primary" onClick={(e) => this.handleClick(e)}>
                                    Add
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }

    handleClick(e) {
        const node = this.refs.input
        const name = node.value.trim()
        this.props.onAddClick(name)
        node.value = ''
    }
}

/*
AddNewPing.propTypes = {
    onAddClick: PropTypes.func.isRequired
}
*/