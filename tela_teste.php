<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="style-dashboard.css">
    <title>Gestão de Eventos</title>
</head>

<body>

    <div class="container">

        <aside class="left-section">
            <div class="logo">
                <button class="menu-btn" id="menu-close">
                    <i class='bx bx-log-out-circle'></i>
                </button>
                <img src="img/logomarca.png">
                <a href="#">Prime Events</a>
            </div>

            <div class="sidebar">
                <div class="item" id="active">
                    <i class='bx bx-home-alt-2'></i>
                    <a href="#">Visão Geral</a>
                </div>
                <div class="item">
                    <i class='bx bx-grid'></i>
                    <a href="dashboard-items/dasboard-eventos.html">Eventos</a>
                </div>
                <div class="item">
                    <i class='bx bx-message-square-dots'></i>
                    <a href="dashboard-items/dasboard-mensagem.html">Mensagens</a>
                </div>
                <div class="item">
                    <i class='bx bx-cog'></i>
                    <a href="dashboard-items/dasboard-configuracao.html">Configurações</a>
                </div>
                <div class="item">
                    <i class='bx bxs-file-doc'></i>
                    <a href="dashboard-items/dasboard-documentacao.html">Documentação</a>
                </div>
            </div>
            <div class="upgrade" style="background-color: white;">
                
            </div>
        </aside>

        <main>
            <header>
                <button class="menu-btn" id="menu-open">
                    <i class='bx bx-menu'></i>
                </button>
                <h5>Olá <b>França</b>, bem-vindo de volta!</h5>
            </header>

            <div class="separator">
                <div class="info">
                    <h3>Meus Eventos</h3>
                    <a href="#">Ver Todos</a>
                </div>
                <div class="search">
                    <i class='bx bx-search'></i>
                    <input type="text" placeholder="Buscar...">
                </div>
            </div>

            <div class="analytics">
                <!-- Aqui você pode adicionar informações específicas sobre os eventos, como estatísticas de participação, receitas, etc. -->
            </div>

            <div class="separator">
                <div class="info">
                    <h3>Agenda</h3>
                    <a href="#">Ver Todos</a>
                </div>
                <input type="date" value="2023-10-15">
            </div>

            <div class="planning">
                <!-- Aqui você pode listar os eventos agendados e suas informações, como horário, local, etc. -->
            </div>
        </main>

        <aside class="right-section">
            <div class="top"> 
                <i class='bx bx-bell'></i>
                <div class="profile" >
                    <div class="left" >
                        <img src="img/logo.png">
                        <div class="user">
                            <h5>Filipe França</h5>
                        </div>
                    </div>
                    <i class='bx bxs-chevron-right'></i>
                </div>
            </div>

            <div class="separator" id="first">
                <h4>Estatísticas</h4>
            </div>

            <div class="stats">
                <!-- Aqui você pode incluir estatísticas específicas relacionadas aos eventos, como número de participantes, sucesso de eventos, etc. -->
            </div>

            <div class="separator">
                <h4>Trabalho Semanal</h4>
            </div>

            <div class="weekly">
                <!-- Aqui você pode incluir informações sobre tarefas agendadas para a semana relacionadas aos eventos. -->
            </div>

        </aside>

    </div>

    <script src="script-dashboard.js"></script>
</body>
</html>