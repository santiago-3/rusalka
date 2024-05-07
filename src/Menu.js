import { Link } from "react-router-dom";
import ShowOrLog from "./showOrLog.js";

const Menu = () => {
    return (
        <ShowOrLog>
            <div className="menu flex-center">
                <ul>
                    <li><Link to="write-english-to-russian">Write - English to russian</Link></li>
                    <li><Link to="write-russian-to-english">Write - Russian to english</Link></li>
                    <li><Link to="select-english-to-russian">Select - Hola English to russian</Link></li>
                    <li><Link to="select-russian-to-english">Select - Russian to english</Link></li>
                </ul>
            </div>
        </ShowOrLog>
    )
}

export default Menu
