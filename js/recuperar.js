import { recuperarSenha } from './api.js';
import { mostrarMensagem } from './utils.js';

document.getElementById('formRecuperar').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o reload da página

    // Pega o e-mail do campo
    const email = document.getElementById('email').value.trim();

    // Valida se o campo não está vazio
    if (!email) {
        mostrarMensagem('Por favor, insira seu e-mail.', 'red');
        return;
    }

    // Desabilita o botão enquanto a requisição é feita
    const botao = document.getElementById('recuperar');
    botao.disabled = true;
    botao.textContent = 'Enviando...';

    // Faz a requisição à API
    const { sucesso, msg } = await recuperarSenha(email);

    // Reabilita o botão
    botao.disabled = false;
    botao.textContent = 'Recuperar senha';

    // Se a recuperação for bem-sucedida, armazenar o token
    if (sucesso) {
        // O token de recuperação é armazenado no localStorage
        // Isso permite que o frontend envie o token automaticamente quando o usuário for alterar a senha
        localStorage.setItem("recuperacaoToken", msg.token);

        mostrarMensagem(msg || 'Instruções de recuperação enviadas ao seu e-mail.', 'green');
        
        // Redireciona para a página de alteração de senha (se necessário)
        window.location.href = '/alterar-senha.html';  // Exemplo de redirecionamento

    } else {
        mostrarMensagem(msg || 'Não foi possível enviar o e-mail de recuperação.', 'red');
    }
});
