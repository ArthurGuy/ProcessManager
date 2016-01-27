import React from 'react';

export default class TagList extends React.Component {

    onTagClick(tag) {

        if (this.props.onTagClick) {
            this.props.onTagClick(tag)
        }
    }

    render() {

        return (
            <span>
            {this.props.tags.map(tag =>
                <a
                    className="label label-info" onClick={e => {
                        e.preventDefault();
                        this.onTagClick(tag)
                    }}
                    key={tag}
                    style={{margin: '0 1px'}}
                >
                    {tag}
                </a>
            )}
            </span>
        )

    }
}