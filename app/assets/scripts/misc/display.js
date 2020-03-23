import VSchema from '../schemas/schema';
import Mobile from '../mobile';
import Desktop from '../desktop';
import ChartDescription from './chartDescription'
class Display {
    constructor(){
        this.displaySize = window.innerWidth;
        this.show = null;
        this.currentState = null
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
                new Mobile();
            }
        } else {
            checker = document.querySelector(".desktop-page");
            if(this.currentState === "Desktop" && !checker){
                var  mchecker = document.querySelector(".mobile-page");
                if(mchecker){
                    mchecker.parentNode.removeChild(mchecker);
                }
                new Desktop();
            }
            
        }
        return this.fetchSchema();
    }

    fetchSchema(){
        var myargs = this;
        fetch('assets/files/nano.json', {mode: 'no-cors'})
        .then(function(result){
            return result.text()
        }).then(function(data){
            const vsc = new VSchema(JSON.parse(data))
            return vsc.events();
        }).then(function(processedSchema){
            if(myargs.displaySize < 900){
                vegaEmbed('#vis', processedSchema);
                vegaEmbed('#vis2', processedSchema);
                vegaEmbed('#vis3', processedSchema);
                return vegaEmbed('#vis4', processedSchema);
            }
            vegaEmbed('#vis', processedSchema);
            return new ChartDescription(processedSchema.extras);
        })
    }

    initialize(){
        if(this.displaySize < 900){
            this.currentState = "Mobile";
        } else {
            this.currentState = "Desktop";
        }
        return this.displayFunc();
    }
}
export default Display;