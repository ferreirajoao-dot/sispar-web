import React, {Fragment} from "react";

const FbConditionalWrapper = ({ children, isParents }) => {
    if (isParents) {
        return (
            <div className="d-flex align-items-center gap-5">
                {children}
            </div>
        )
    } else {
        return  <Fragment>{children}</Fragment>
    }
}

export default React.memo(FbConditionalWrapper)