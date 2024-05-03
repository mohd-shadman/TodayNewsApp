import React, { Component } from 'react'

export class Spinner extends Component {
    render() {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border content-center" role="status">
                        <span className="sr-only">load</span>
                    </div>
                </div>
            </>
        )
    }
}

export default Spinner
