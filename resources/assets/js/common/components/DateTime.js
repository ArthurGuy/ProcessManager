import React from 'react';
import moment from 'moment'

export default class DateTime extends React.Component {

    render() {

        return (
            <span>{moment(this.props.date).format('D/M/YYYY HH:mm')}</span>
        )

    }
}