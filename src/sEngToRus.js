import { React } from 'react'
import ShowOrLog from './showOrLog'
import Selector from './selector.js'
import config from './config.js'

const SEngToRus = ({setProgram}) => {
    const {apps} = config
    const app = apps.selectEnglishToRussian
    return (
        <ShowOrLog>
            <Selector app={app} />
        </ShowOrLog>
    )
}

export default SEngToRus
