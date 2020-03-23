class Mobile {
    constructor(){
        this.events();
    }
    
    events(){
        document.body.insertAdjacentHTML("beforeend", `
        <div class="mobile-page">
            <main class="main">
                <div class="wrapper u-margin-top">
                    <div class="row row--gutter-2-col row--spacing">
                        <div class="column-2-of-4">
                            <div class="main_thumb-headerbottom">
                                <div class="main_thumb-titleside"></div>
                                Electrical Conductivity Bar Chart
                            </div>
                            <div class="main_thumb-headertop"> </div>
                            <div class="main_thumb-container">
                                <div id="vis"></div>
                            </div>
                            <div class="main_thumb-headertop"></div>
                        </div>
                        <div class="column-2-of-4">
                            <div class="main_thumb-headerbottom">
                                <div class="main_thumb-titleside"></div>
                                Electrical Conductivity Bar Chart
                            </div>
                            <div class="main_thumb-headertop"> </div>
                            <div class="main_thumb-container">
                                <div id="vis2"></div>
                            </div>
                            <div class="main_thumb-headertop"> </div>
                        </div>
                        <div class="column-2-of-4">
                            <div class="main_thumb-headerbottom">
                                <div class="main_thumb-titleside"></div>
                                Electrical Conductivity Bar Chart
                            </div>
                            <div class="main_thumb-headertop"> </div>
                            <div class="main_thumb-container">
                                <div id="vis3"></div>
                            </div>
                            <div class="main_thumb-headertop"> </div>
                        </div>
                        <div class="column-2-of-4">
                            <div class="main_thumb-headerbottom">
                                <div class="main_thumb-titleside"></div>
                                Electrical Conductivity Bar Chart
                            </div>
                            <div class="main_thumb-headertop"> </div>
                            <div class="main_thumb-container">
                                <div id="vis4"></div>
                            </div>
                            <div class="main_thumb-headertop"></div>
                        </div>
                    </div>
                </div>
                <div class="main_pagination">
                    <ul>
                        <li class="nav-btn">Previous</li>
                        <li class="pager">Page 1 of 4</li>
                        <li class="nav-btn">Next</li>
                    </ul>
                </div>
            </main>
            <div class="appbg"></div>
            <div class="footer">Copyright 2020 Nanomine Team. All Rights Reserved</div>
        </div>
        `)
    }
}

export default Mobile;