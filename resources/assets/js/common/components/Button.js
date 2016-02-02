import React from 'react';
import {FormattedDate, injectIntl} from 'react-intl';


const Button = ({message, type, onClick}) => {

    if (!message) {
        return (<span />)
    }

    return (
        <button className={ 'btn btn-' + type } onClick={onClick}>{ message }</button>
    )

}

//Inject the internationalisation data into the component
export default injectIntl(Button)