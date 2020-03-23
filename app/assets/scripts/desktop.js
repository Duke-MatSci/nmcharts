import SideMenu from './sidemenu';
class Desktop{
    constructor(){
        this.events();
    }

    events(){
        console.log("This is desktop")
        document.body.insertAdjacentHTML("beforeend",
        `
        <div class="desktop-page">
            <main class="main">
                <div class="wrapper u-margin-top">
                    <div class="main_thumb-headertop"> </div>
                    <div class="main_thumb-container">
                        <div id="vis"></div>
                    </div>
                    <div class="main_thumb-headerbottom">
                        <div class="main_thumb-titleside"></div>
                        <span>Electrical Conductivity Bar Chart</span>
                    </div>
                </div>
            </main>
            <div class="sidemenu">
                <div id="sidebar-icon" class="button u-margin-bottom">Hide Bar</div>
                <div class="sidemenu_thumbnail">
                    <img src="assets/images/thumb.png" alt="Electrical Conductivity Bar Chart" />
                    <div class="sidemenu_thumbnail-text">
                        Electrical Conductivity Bar Chart
                    </div>
                </div>
                <div class="sidemenu_thumbnail">
                    <img src="assets/images/thumb.png" alt="Electrical Conductivity Bar Chart" />
                    <div class="sidemenu_thumbnail-text">
                        Electrical Conductivity Bar Chart
                    </div>
                </div>
                <div class="sidemenu_thumbnail">
                    <img src="assets/images/thumb.png" alt="Electrical Conductivity Bar Chart" />
                    <div class="sidemenu_thumbnail-text">
                        Electrical Conductivity Bar Chart
                    </div>
                </div>
                <div class="sidemenu_thumbnail u-opacity">
                    <div class="sidemenu_selected">&oast; Selected</div>
                    <img src="assets/images/thumb.png" alt="Electrical Conductivity Bar Chart" />
                    <div class="sidemenu_thumbnail-text">
                        Electrical Conductivity Bar Chart
                    </div>
                </div>
                <div class="main_pagination">
                    <ul>
                        <li class="nav-btn">Previous</li>
                        <li class="pager">Page 1 of 4</li>
                        <li class="nav-btn">Next</li>
                    </ul>
                </div>
            </div>
            <div class="appbg"></div>
            <div class="footer">Copyright 2020 Nanomine Team. All Rights Reserved</div>
        </div>
        `
        )

        return new SideMenu();
    }
}

export default Desktop;