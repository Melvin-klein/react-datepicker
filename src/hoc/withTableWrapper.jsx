import React from 'react';

const withTableWrapper = View => {
    return props => {
        return (
            <table>
                <tbody>
                    <View {...props} />
                </tbody>
            </table>
        )
    }
};

export default withTableWrapper;