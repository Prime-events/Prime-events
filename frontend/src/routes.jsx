import {BrowserRouter,Routes,Route} from 'react-router-dom';
import TelaInicial from "./Pages/TelaInicial/tela_inicial.jsx";
import Formulario from './Pages/Formulario/formulario.jsx';
import SegundoHeader from './components/header/segundoHeader/segundoHeader.jsx';

function RoutesApp(){

    return (
       <BrowserRouter>
       <Routes>
           <Route path='/' element = {<TelaInicial/>}/>
           <Route path='/formulario' element = {<Formulario/>}/>
           <Route path='/segundoHeader' element = {<SegundoHeader/>}/>
         </Routes>
       </BrowserRouter>
    );
   }
   
   export default RoutesApp;

