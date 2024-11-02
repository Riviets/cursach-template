import React from 'react'
import { Outlet } from 'react-router-dom';

function EmptyLayout(){
    return(
        <div>
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default EmptyLayout