import React from 'react';
import {FormattedDate, injectIntl} from 'react-intl';


const Alert = ({message, type}) => {

    if (!message) {
        return (<span />)
    }

    return (
        <div className={ 'alert alert-' + type }>{ message }</div>
    )

}

//Inject the internationalisation data into the component
export default injectIntl(Alert)