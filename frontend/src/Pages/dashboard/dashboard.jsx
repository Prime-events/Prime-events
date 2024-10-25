import { Button } from 'reactstrap';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        //sessionStorage.removeItem('token'); //seria o mais correto tirar somente o token mas como as vezes não apaga é melhor limpar completamente o localstorage
        localStorage.clear();
        navigate('/'); // Redirecione para a página de login
    };

    return (
        <div className="container-dashboard">
        <div>
            <h1>Olá mundo</h1>
        </div>
        <div className="button-logout">
            <Button color="danger" outline onClick={handleLogout}>
            Sair
            </Button>
        </div>
        </div>
    );
}

export default Dashboard;
