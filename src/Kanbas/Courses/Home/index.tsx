import ModuleList from "../Modules/List";
function Home() {
    return (
        <div className="d-flex flex-row">
            <ModuleList />
            <div className="flex-grow-0 me-2 d-none d-lg-block jj-courses-home-sidebar">
            <ul>
                <li><button className="jj-wide-grey-btn"><i className="fa-solid fa-file-import"></i> Import Existing
                        Content</button></li>
                <li><button className="jj-wide-grey-btn"><i className="fa-solid fa-arrows-turn-right"></i> Import From
                        Commons</button></li>
                <li><button className="jj-wide-grey-btn"><i className="fa-solid fa-bullseye"></i> Choose Home Page</button></li>
                <li><button className="jj-wide-grey-btn"><i className="fa-solid fa-chart-column"></i> View Course
                        Stream</button></li>
                <li><button className="jj-wide-grey-btn"><i className="fa-solid fa-bullhorn"></i> New Announcement</button></li>
                <li><button className="jj-wide-grey-btn"><i className="fa-solid fa-chart-column"></i> New Analytics</button>
                </li>
                <li><button className="jj-wide-grey-btn"><i className="fa-regular fa-bell"></i> View Course
                        Notifications</button></li>
            </ul>

            <b>Coming Up</b>
            <hr></hr>
            <ul>
                <li>
                    <div className="jj-coming-up-list-item">
                        <i className="fa-solid fa-calendar"></i>
                        <div>
                            <a href="#">Lecture</a>
                            <p>CS4550.12631.202410<br></br>
                                Sep 7 at 11:45am</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="jj-coming-up-list-item">
                        <i className="fa-solid fa-calendar"></i>
                        <div>
                            <a href="#">CS5610 Lecture</a>
                            <p>CS5610.12631.202410<br></br>
                                Sep 11 at 6pm</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="jj-coming-up-list-item">
                        <i className="fa-solid fa-calendar"></i>
                        <div>
                            <a href="#">CS1234 Sp 23 Lecture</a>
                            <p>CS1234.12731.202410<br></br>
                                Sep 7 at 11:45am</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        </div>
    )
}
export default Home;