import '../styles/style.css';
import 'lazysizes';

import Display from './misc/display';

new Display();

// fetch('assets/files/nano.json', {mode: 'no-cors'})
//     .then(function(result){
//         return result.text()
//     }).then(function(data){
//         const vsc = new VSchema(JSON.parse(data))
//         return vsc.events()
//     }).then(function(processedSchema){
//         if(isMobile){
//             vegaEmbed('#vis', processedSchema);
//             vegaEmbed('#vis2', processedSchema);
//             vegaEmbed('#vis3', processedSchema);
//             return vegaEmbed('#vis4', processedSchema);
//         }
//         return vegaEmbed('#vis', processedSchema);
//     })


if(module.hot){
    module.hot.accept();
}