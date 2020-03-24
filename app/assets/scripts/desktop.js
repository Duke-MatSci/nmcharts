import SideMenu from './sidemenu';
import ChartDescription from "../scripts/misc/chartDescription";

class Desktop{
    constructor(charts){
        this.charts = charts;
        this.totalPages = 0;
        this.thumbPerPage = 4;
        this.currentPage = 1;
        this.currentSelection = null;
        this.nextButton = document.querySelector(".navprev");
        this.prevButton = document.querySelector(".navnext");
        this.initialize();
        this.events();
    }

    // Event Handler. Pagination and Thumbnail Selection
    events(){
        window.addEventListener("click", (e)=> {
            const button = e.target.closest(".nav-btn");
            const thumbnailBtn = e.target.closest(".sidemenu_thumbnail");
            if(button && button.dataset){
                if(button.dataset.btn === "navnext"){
                    this.next();
                } else if(button.dataset.btn === "navprev"){
                    this.prev();
                }
            }
            if(thumbnailBtn && thumbnailBtn.dataset){
                this.thumbnailSelection(thumbnailBtn.dataset.thumb, thumbnailBtn)
            }
        })
    }

    next(){
        const current = this.currentPage + 1;
        if(current <= this.totalPages){
            this.currentPage = current;
            document.querySelector("#thumbnail-wrapper").innerHTML = '';
            const pager = document.querySelector(".desktop-pager");
            pager.innerHTML = "Page " + this.currentPage + " of " + this.totalPages;
            this.loadThumb();
        }
    }

    prev() {
        const current = this.currentPage - 1;
        if(current >= 1){
            this.currentPage = current;
            document.querySelector("#thumbnail-wrapper").innerHTML = '';
            const pager = document.querySelector(".desktop-pager");
            pager.innerHTML = "Page " + this.currentPage + " of " + this.totalPages;
            this.loadThumb();
        }
    }

    thumbnailSelection(arg, item){
        if(this.currentSelection !== arg){
            const allThumbs = document.querySelectorAll(".sidemenu_thumbnail");
            const vContainer = document.querySelector("#vis");
            allThumbs.forEach(el => {
                el.classList.remove("u-opacity")
            })
            item.classList.add("u-opacity");
            vContainer.innerHTML = "";
            this.fetchSchema(this.charts[arg]);
            this.currentSelection = arg;
        }
        return;
    }


    // HTML Markup For the Page
    loader(){
        const markUp =`
        <div class="desktop-page">
            <main class="main">
                <div class="wrapper u-margin-top">
                    <div class="main_thumb-headertop"> </div>
                    <div class="main_thumb-container">
                        <div id="vis"></div>
                    </div>
                    <div class="main_thumb-headerbottom">
                        <div class="main_thumb-titleside"></div>
                        <span class="v-chat-title">Electrical Conductivity Bar Chart</span>
                    </div>
                </div>
            </main>
            <div class="sidemenu">
                <div id="sidebar-icon" class="button u-margin-bottom">Hide Bar</div>
                <div id="thumbnail-wrapper"></div>
                <div class="main_pagination">
                    <ul>
                        <li class="nav-btn" data-btn="navprev">Previous</li>
                        <li class="pager desktop-pager">Page ${this.currentPage} of ${this.totalPages}</li>
                        <li class="nav-btn" data-btn="navnext">Next</li>
                    </ul>
                </div>
            </div>
            <div class="appbg"></div>
            <div class="footer">Copyright 2020 Nanomine Team. All Rights Reserved</div>
        </div>
        `;

        document.body.insertAdjacentHTML("beforeend", markUp);
    }

    fetchSchema(args){
        const title = document.querySelector(".v-chat-title");
        var arg = !args ? this.charts[0] : args;
        fetch("assets/scripts/"+arg.file, {mode: 'no-cors'})
        .then(function(result){
            return result.text()
        }).then(function(data){
            const vsc = new arg.schema(data)
            return vsc.events();
        }).then(function(processedSchema){
            vegaEmbed('#vis', processedSchema);
            title.innerHTML = processedSchema.usermeta.title;
            if(args){
                const descriptor = document.querySelector(".vega-chart-descriptor");
                descriptor.innerHTML = processedSchema.usermeta.description;
            }else {
                return new ChartDescription(processedSchema.usermeta.description);
            }
        })
    }

    // Loading SideBar and Thumbnails
    thumbMarkUp(index, el){
        const wrapper = document.querySelector("#thumbnail-wrapper");
        const htmlMarkUp = `
        <div class="sidemenu_thumbnail" data-thumb=${index}>
            <img src="assets/scripts/${el.thumb}" alt="${el.name}"/>
            <div class="sidemenu_thumbnail-text">
                ${el.name}
            </div>
        </div>
        `
        wrapper.insertAdjacentHTML("beforeend", htmlMarkUp);
    }

    loadThumb() {
        this.charts.forEach((el,index) => {
            if(index+1 <= this.thumbPerPage*this.currentPage && index+1 > (this.thumbPerPage*this.currentPage - this.thumbPerPage)){
                return this.thumbMarkUp(index, el)
            }
        })
    }

    // This Initializes the Script
    initialize(){
        this.totalPages = Math.ceil(((this.charts.length/this.thumbPerPage)*100)/100);
        this.loader();
        this.loadThumb();
        new SideMenu();
        this.fetchSchema();
    }
}

export default Desktop;