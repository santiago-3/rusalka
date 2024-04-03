import { React } from 'react'
import ShowOrLog from './showOrLog'
import Selector from './selector.js'
import config from './config.js'

const SRusToEng = ({setProgram}) => {
    const {apps} = config
    // setProgram('Select russian to english')
    const app = apps.selectRussianToEnglish
    return (
        <ShowOrLog>
            <Selector app={app} />
        </ShowOrLog>
    )
}

export default SRusToEng

