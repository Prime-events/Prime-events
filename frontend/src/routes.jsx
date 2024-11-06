import {BrowserRouter,Routes,Route} from 'react-router-dom';
import TelaInicial from "./Pages/TelaInicial/tela_inicial.jsx";
import Formulario from './Pages/Formulario/formulario.jsx';
import Dashboard from './Pages/Dashboard/dashboard.jsx';
import SegundoHeader from './components/header/segundoHeader/segundoHeader.jsx';
import Eventos from './Pages/Eventos/eventos.jsx';
import CriacaoEvento from './Pages/CriacaoEvento/criacaoEvento.jsx';
import Cronograma from './components/cronograma/cronograma.jsx';

function RoutesApp(){

    return (
       <BrowserRouter>
       <Routes>
           <Route path='/' element = {<TelaInicial/>}/>
           <Route path='/formulario' element = {<Formulario/>}/>
           <Route path='/dashboard' element = {<Dashboard/>}/>
           <Route path='/eventos' element = {<Eventos/>}/>
           <Route path='/segundoHeader' element = {<SegundoHeader/>}/>
            <Route path='/criarEvento' element = {<CriacaoEvento/>}/>
           <Route path='/cronograma' element = {<Cronograma/>}/>
         </Routes>
       </BrowserRouter>
    );
  }

export default RoutesApp;

