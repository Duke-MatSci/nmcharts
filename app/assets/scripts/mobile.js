class Mobile {
    constructor(charts){
        this.charts = charts;
        this.totalPages = 0;
        this.chatPerPage = 1;
        this.currentPage = 1;
        this.nextButton = document.querySelector(".navprev");
        this.prevButton = document.querySelector(".navnext");
        this.initialize();
        this.events();
    }

    // Event Handler. Pagination and Thumbnail Selection
    events(){
        window.addEventListener("click", (e)=> {
            const button = e.target.closest(".nav-btns");
            if(button && button.dataset){
                if(button.dataset.btn === "navnext"){
                    this.next();
                } else if(button.dataset.btn === "navprev"){
                    this.prev();
                }
            }
        })
    }

    next() {
        const current = this.currentPage + 1;
        if(current <= this.totalPages){
            this.currentPage = current;
            document.querySelector("#vis").innerHTML = "";
            this.fetchSchema(this.charts[this.currentPage-1]);
            this.pagination(current);
        }
    }

    prev() {
        const current = this.currentPage - 1;
        if(current >= 1){
            this.currentPage = current;
            document.querySelector("#vis").innerHTML = "";
            this.fetchSchema(this.charts[this.currentPage-1]);
            this.pagination(current);
        }
    }
    
    loader(){
        document.body.insertAdjacentHTML("beforeend", `
        <div class="mobile-page">
            <main class="main">
                <div class="wrapper u-margin-top">
                    <div class="row row--gutter-2-col row--spacing">
                        <div class="column-2-of-4">
                            <div class="main_thumb-headerbottom">
                                <div class="main_thumb-titleside"></div>
                                <span class="v-chat-title">Electrical Conductivity Bar Chart</span>
                            </div>
                            <div class="main_thumb-headertop"> </div>
                            <div class="main_thumb-container">
                                <div id="vis"></div>
                            </div>
                            <div class="main_thumb-headertop"></div>
                            <div class="main_thumb-descriptor v-descriptor"></div>
                        </div>
                    </div>
                </div>
                <div class="main_pagination">
                    <ul>
                        <li class="nav-btns" data-btn="navprev">Previous</li>
                        <li class="pager">Page 1 of ${this.charts.length}</li>
                        <li class="nav-btns" data-btn="navnext">Next</li>
                    </ul>
                </div>
            </main>
            <div class="appbg"></div>
            <div class="footer">Copyright 2020 Nanomine Team. All Rights Reserved</div>
        </div>
        `)
    }

    fetchSchema(args){
        const title = document.querySelector(".v-chat-title");
        const descriptor = document.querySelector(".v-descriptor");
        var arg = !args ? this.charts[0] : args;
        fetch("/assets/scripts/"+arg.file, {mode: 'no-cors'})
        .then(function(result){
            return result.text();
        }).then(function(data){
            const vsc = new arg.schema(data)
            return vsc.events();
        }).then(function(processedSchema){
            vegaEmbed('#vis', processedSchema);
            descriptor.innerHTML = processedSchema.usermeta.description;
            return title.innerHTML = processedSchema.usermeta.title;
            // if(args){
            //     const descriptor = document.querySelector(".vega-chart-descriptor");
            //     descriptor.innerHTML = processedSchema.usermeta.description;
            // }else {
            //     return new ChartDescription(processedSchema.usermeta.description);
            // }
        })
    }

    pagination(args){
        const pager = document.querySelector(".pager");
        const length = this.charts.length;
        this.currentPage = !args ? this.currentPage : args >=1 && args <= length ? args : this.currentPage;
        pager.innerHTML = "Page " + this.currentPage + " of " + length;
    }

    // This Initializes the Script
    initialize(){
        this.totalPages = this.charts.length;
        this.loader();
        this.fetchSchema();
    }
}

export default Mobile;