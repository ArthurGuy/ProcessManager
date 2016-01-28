import React from 'react';
import {FormattedRelative, injectIntl} from 'react-intl';

const TimeAgo = ({date, intl}) => {

    if (date == '0000-00-00 00:00:00') {
        return (<span>-</span>)
    }

    return (
        <FormattedRelative value={new Date(date)} />
    )

}

//Inject the internationalisation data into the component
export default injectIntl(TimeAgo)