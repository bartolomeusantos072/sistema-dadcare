import { loginUsuario } from '../api/usuarios.js';
import { mostrarMensagem } from '../api/utils.js';

document.getElementById('formLogin').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o reload da página

    // Obter os valores dos campos
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Validação simples
    if (!email || !senha ) {
        mostrarMensagem('Por favor, preencha todos os campos.', 'red');
        return;
    }

    // Desabilitar o botão durante o processo
    const botao = document.getElementById('acessar');
    botao.disabled = true;
    botao.textContent = 'Carregando...';

    // Tentar fazer login
    const { sucesso, msg, user } = await loginUsuario(email, senha);

    // Reabilitar o botão
    botao.disabled = false;
    botao.textContent = 'Acessar';

    // Mostrar mensagem
    if (sucesso) {
        mostrarMensagem(`Bem-vindo, ${user.nome}!`, 'green');
        setTimeout(() => {
            window.location.href = 'sistema.html'; // Redireciona após o login
        }, 1500);
    } else {
        mostrarMensagem(msg || 'Falha ao fazer login. Verifique suas credenciais.', 'red');
    }
});
