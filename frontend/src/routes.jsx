import {BrowserRouter,Routes,Route} from 'react-router-dom';
import TelaInicial from "./Pages/TelaInicial/tela_inicial.jsx";
import Formulario from './Pages/Formulario/formulario.jsx';
import Dashboard from './Pages/dashboard/dashboard.jsx';

function RoutesApp(){

    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element = {<TelaInicial/>}/>
            <Route path='/formulario' element = {<Formulario/>}/>
            <Route path='/dashboard' element = {<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
    );
  }

export default RoutesApp;

