import React from 'react';
import {FormattedRelative, injectIntl} from 'react-intl';

const TimeAgo = ({date, intl}) => {

    if (date == null) {
        return (<span>-</span>)
    }

    return (
        <FormattedRelative value={new Date(date)} />
    )

}

//Inject the internationalisation data into the component
export default injectIntl(TimeAgo)