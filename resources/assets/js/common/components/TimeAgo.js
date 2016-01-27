import React from 'react';
import moment from 'moment'

export default class TimeAgo extends React.Component {

    render() {

        return (
            <span>{moment(this.props.date).fromNow()}</span>
        )

    }
}