import React from 'react';
import {FormattedDate, injectIntl} from 'react-intl';


const DateTime = ({date, intl}) => {

    if (date == '0000-00-00 00:00:00') {
        return (<span>-</span>)
    }

    return (
        <span>
            <FormattedDate
                value={new Date(date)}
                day="numeric"
                month="short"
                year="numeric" />
        </span>
    )

}

//Inject the internationalisation data into the component
export default injectIntl(DateTime)