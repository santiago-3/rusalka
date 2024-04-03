import { Link } from "react-router-dom";
import ShowOrLog from "./showOrLog.js";

const Menu = () => {
    return (
        <ShowOrLog>
            <div className="menu flex-center">
                <ul>
                    <Link to="write-english-to-russian"><li>Write - English to russian</li></Link>
                    <li><Link to="write-russian-to-english">Write - Russian to english</Link></li>
                    <li><Link to="select-english-to-russian">Select - English to russian</Link></li>
                    <li><Link to="select-russian-to-english">Select - Russian to english</Link></li>
                </ul>
            </div>
        </ShowOrLog>
    )
}

export default Menu
