import aggregated from '../schemas/nmcharts-aggregated-bar-chart/schema-template';
import conductivity from '../schemas/nmcharts-conductivity-loading/schema-template';
import deltatg from '../schemas/nmcharts-deltaTg-loading/schema-template';
import dielectric from '../schemas/nmcharts-dielectric-spectroscopy/schema-template';
import tgdensity from '../schemas/nmcharts-Tg-density-plots/schema-template';
import tgheatmap from '../schemas/nmcharts-Tg-heatmap/schema-template';
import electricconductivity from '../schemas/nmcharts-electrical-conductivity-bar-chart/schema-template';
import electricconductivitylinkedplot from '../schemas/nmcharts-electrical-conductivity-linked-plots/schema-template';
import deltatgscatterplot from '../schemas/nmcharts-delta-Tg-scatter-plot/schema-template';
import Mobile from '../mobile';
import Desktop from '../desktop';


class Display {
    constructor(){
        this.displaySize = window.innerWidth;
        this.show = null;
        this.charts = null;
        this.currentState = null;
        this.initialize();
        this.events(this);
    }

    events(args){
        window.addEventListener("resize", function(){
            setTimeout(function(){
                args.show = null
                args.displaySize = window.innerWidth;
                if(args.displaySize < 900){
                    args.currentState = "Mobile";
                } else {
                    args.currentState = "Desktop";
                }
                return args.displayFunc();
            },500)
        })
    }

    displayFunc() {
        var checker = undefined;
        if(this.displaySize < 900){
            checker = document.querySelector(".mobile-page");
            if(this.currentState === "Mobile" && !checker ){
                var dchecker = document.querySelector(".desktop-page");
                if(dchecker){
                    dchecker.parentNode.removeChild(dchecker);
                }
                return new Mobile(this.charts);
            }
        } else {
            checker = document.querySelector(".desktop-page");
            if(this.currentState === "Desktop" && !checker){
                var  mchecker = document.querySelector(".mobile-page");
                if(mchecker){
                    mchecker.parentNode.removeChild(mchecker);
                }
                return new Desktop(this.charts);
            }
            
        }
    }

    addAllCharts() {
        this.charts = [
            {
                schema: deltatgscatterplot,
                thumb: "schemas/nmcharts-delta-Tg-scatter-plot/thumb.png",
                file: "schemas/nmcharts-delta-Tg-scatter-plot/nano.json",
                name: "Delta Tg Scatter Plot & Density Plot"
            },
            {
                schema: conductivity,
                thumb: "schemas/nmcharts-conductivity-loading/thumb.png",
                file: "schemas/nmcharts-conductivity-loading/nano.json",
                name: "Conductivity"
            },
            {
                schema: deltatg,
                thumb: "schemas/nmcharts-deltaTg-loading/thumb.png",
                file: "schemas/nmcharts-deltaTg-loading/nano.json",
                name: "DeltaTg"
            },
            {
                schema: dielectric,
                thumb: "schemas/nmcharts-dielectric-spectroscopy/thumb.png",
                file: "schemas/nmcharts-dielectric-spectroscopy/Ning_dielectric.csv",
                name: "Dielectric Spectroscopy"
            },
            {
                schema: tgdensity,
                thumb: "schemas/nmcharts-Tg-density-plots/thumb.png",
                file: "schemas/nmcharts-Tg-density-plots/nano.json",
                name: "Tg-Density Plots"
            },
            {
                schema: tgheatmap,
                thumb: "schemas/nmcharts-Tg-heatmap/thumb.png",
                file: "schemas/nmcharts-Tg-heatmap/nano.json",
                name: "Tg-Heatmap"
            },
            {
                schema: electricconductivity,
                thumb: "schemas/nmcharts-electrical-conductivity-bar-chart/thumb.png",
                file: "schemas/nmcharts-electrical-conductivity-bar-chart/nano.json",
                name: "Electrical Conductivity Bar Chart"
            },
            {
                schema: electricconductivitylinkedplot,
                thumb: "schemas/nmcharts-electrical-conductivity-linked-plots/thumb.png",
                file: "schemas/nmcharts-electrical-conductivity-linked-plots/nano.json",
                name: "Electrical Conductivity Linked Plots"
            },
            {
                schema: aggregated,
                thumb: "schemas/nmcharts-aggregated-bar-chart/thumb.png",
                file: "schemas/nmcharts-aggregated-bar-chart/nano.json",
                name: "Aggregated Bar Chart"
            },
        ]
    }

    initialize(){
        if(this.displaySize < 900){
            this.currentState = "Mobile";
        } else {
            this.currentState = "Desktop";
        }
        this.addAllCharts();
        return this.displayFunc();
    }
}
export default Display;