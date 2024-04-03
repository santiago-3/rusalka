import { React } from 'react'

const ShowOrLoading = ({loading,children}) => {
    if (loading) {
        return <div className="loading">Loading</div>
    }
    else{
        return <div>{children}</div>
    }
}

export default ShowOrLoading
