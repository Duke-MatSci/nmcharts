class SideMenu {
    constructor(){
        this.icon = document.querySelector("#sidebar-icon");
        this.sideBarItems = document.querySelectorAll(".sidemenu_thumbnail");
        this.bar = document.querySelector(".sidemenu ");
        this.pagination = document.querySelector(".main_pagination");
        this.collapsed = document.querySelector("sidemenu-collapse");
        this.initialize(this);
        this.onClickEvent();
    }

    onClickEvent(){
        this.icon.addEventListener("click", (e)=>this.toggleMenu(e));
    }

    toggleMenu(ev){
        if(ev){
            ev.preventDefault();
        }
        this.sideBarItems.forEach(function(el){
            el.classList.toggle("u-hide");
        });
        this.icon.innerHTML == "Hide Bar" ? this.icon.innerHTML = "More..." : this.icon.innerHTML = "Hide Bar";
        this.bar.classList.toggle("sidemenu-collapse");
        this.icon.classList.toggle("button-toggle");
        this.pagination.classList.toggle("u-hide");

    }

    initialize(arg){
        setTimeout(function(){
            arg.toggleMenu()
        },2000)
    }
}

export default SideMenu;