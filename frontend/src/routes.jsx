import {BrowserRouter,Routes,Route} from 'react-router-dom';
import TelaInicial from "./Pages/TelaInicial/tela_inicial.jsx";
import Formulario from './Pages/Formulario/formulario.jsx';

function RoutesApp(){

    return (
       <BrowserRouter>
       <Routes>
           <Route path='/' element = {<TelaInicial/>}/>
           <Route path='/formulario' element = {<Formulario/>}/>
         </Routes>
       </BrowserRouter>
    );
   }
   
   export default RoutesApp;

