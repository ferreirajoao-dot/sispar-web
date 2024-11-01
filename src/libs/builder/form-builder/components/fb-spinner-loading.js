import React from "react";
import PropTypes from "prop-types";

export default function FbSpinnerLoading(props) {
    if (!props.loading) return <></>
    return (
        <div className={"bottom-0 d-flex end-0 flex-center me-3 position-absolute top-0"}>
            <span className="spinner-border spinner-border-sm align-middle me-2"></span>
        </div>
    )
}

FbSpinnerLoading.propTypes = {
    loading: PropTypes.bool,
}