import React from 'react';

const withTableWrapper = View => {
    return props => {
        return (
            <table style={{ width: "100%"}}>
                <tbody>
                    <View {...props} />
                </tbody>
            </table>
        )
    }
};

export default withTableWrapper;