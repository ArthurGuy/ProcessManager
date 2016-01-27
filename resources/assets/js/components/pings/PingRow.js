import React, { Component, PropTypes } from 'react'

import TagList from '../../common/components/TagList'
import DateTime from '../../common/components/DateTime'
import TimeAgo from '../../common/components/TimeAgo'

export default class PingRow extends Component {
    render() {

        let pingDisabled = (!this.props.active)
        let pingAlert = (this.props.active && this.props.error)
        let pingOK = (this.props.active && !this.props.error)

        return (
            <tr key={this.props.id}>
                <td>
                    {pingDisabled && <span className="btn btn-secondary btn-sm"><span title="Disabled" className="octicon octicon-circle-slash" /></span>}
                    {pingAlert && <span className="btn btn-danger btn-sm"><span title="Error" className="octicon octicon-alert" /></span>}
                    {pingOK && <span className="btn btn-success btn-sm"><span title="OK" className="octicon octicon-thumbsup" /></span>}
                </td>
                <td>
                    {!this.props.editMode && this.props.name}
                    {this.props.editMode && <input defaultValue={this.props.name} type="text" ref="name" className="form-control" />}
                </td>
                <td>
                    {!this.props.editMode && this.props.description}
                    {this.props.editMode && <input defaultValue={this.props.description} type="text" ref="description" className="form-control" />}
                </td>
                <td>

                    {!this.props.editMode && <TagList tags={this.props.tags} />}
                    {this.props.editMode && this.props.tags && <input defaultValue={this.props.tags} type="text" ref="tags" className="form-control" />}
                </td>
                <td>
                    {!this.props.editMode && <DateTime date={this.props.last_ping} />}
                    {!this.props.editMode && <br />}
                    {!this.props.editMode && <small><TimeAgo date={this.props.last_ping} /></small>}
                    {this.props.editMode && <input type="text" className="form-control" ref="frequency_value" defaultValue={this.props.frequency_value} />}
                    {this.props.editMode && <select className="form-control" ref="frequency" defaultValue={this.props.frequency}>
                        <option value="minute" key="minute">minute</option>
                        <option value="hour" key="hour">hour</option>
                        <option value="day" key="day">day</option>
                        <option value="week" key="week">week</option>
                        <option value="month" key="month">month</option>
                    </select>}
                </td>
                <td>
                    {!this.props.editMode && <button className="btn btn-sm btn-default" onClick={this.props.onEditClick}><span title="Edit" className="octicon octicon-pencil" /></button>}
                    {!this.props.editMode && <button className="btn btn-sm btn-danger" onClick={this.props.onDeleteClick}><span title="Delete" className="octicon octicon-trashcan" /></button>}
                    {this.props.editMode && <button className="btn btn-sm btn-success" onClick={(e) => this.handleSaveClick(e)}><span title="Save" className="octicon octicon-check" /></button>}
                    {this.props.editMode && <button className="btn btn-sm btn-default" onClick={this.props.onEditCancelClick}><span title="Cancel" className="octicon octicon-circle-slash" /></button>}
                    {this.props.isSaving && <strong>Saving...</strong>}
                </td>
            </tr>
        )
    }

    handleSaveClick(e) {
        //const nameNode = this.refs.name
        const name = this.refs.name.value.trim()
        //const descriptionNode = this.refs.description
        const description = this.refs.description.value.trim()
        const tags = this.refs.tags.value.trim()
        const frequency = this.refs.frequency.value.trim()
        const frequency_value = this.refs.frequency_value.value.trim()
        this.props.onUpdateClick({name, description, tags, frequency, frequency_value})
    }
}

PingRow.propTypes = {
    active: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    tags: React.PropTypes.array.isRequired,
    last_ping: React.PropTypes.string,
    frequency: React.PropTypes.string.isRequired,
    frequency_value: React.PropTypes.number.isRequired
}