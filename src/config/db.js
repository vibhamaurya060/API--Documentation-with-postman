import {connect} from 'mongoose'

const ConnectToDb=async(url)=>{
    await connect(url)
}

export default ConnectToDb;