import React, { Component, PropTypes } from 'react'

import TagList from '../../common/components/TagList'

export default class ContactRow extends Component {
    render() {

        let className = ''
        if (this.props.isSaving) {
            className = 'table-warning'
        }

        return (
            <tr
                key={this.props.id}
                className={className}
            >
                <td>
                    {!this.props.editMode && this.props.name}
                </td>
                <td>
                    {!this.props.editMode && this.props.email}
                </td>
                <td>

                    {!this.props.editMode && <TagList tags={this.props.filter_tags} />}
                </td>
                <td>
                    {!this.props.editMode && <button className="btn btn-sm btn-danger" onClick={this.props.onDeleteClick} style={{margin: '0 1px'}}><span title="Delete" className="octicon octicon-trashcan" /></button>}
                </td>
            </tr>
        )
    }

}

ContactRow.propTypes = {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string,
    filter_tags: React.PropTypes.array.isRequired,
}