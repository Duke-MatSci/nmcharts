class ChartDescription{
    constructor(descriptor){
        this.descriptor = descriptor;
        this.events();
    }

    events(){
        var checker = document.querySelector(".main_thumb-container");
        if(checker){
            checker.insertAdjacentHTML("beforeend",
            `
            <div class="vega_added_description">
                <span>Chart Description:</span>
                <div class="vega-chart-descriptor">${this.descriptor}</div>
            </div>
            `
            )
        }
    }
}

export default ChartDescription;