import React from 'react';

function Error({ mensaje }) {
    return (
        <div className="card-panel red darken-4 error col s12">
            Atencion!
            {mensaje}
        </div>
    )
}

export default Error;