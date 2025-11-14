import { confirmarRecuperacaoSenha } from './api.js';  // Supondo que essa função esteja em api.js
import { mostrarMensagem } from './utils.js';

document.getElementById('formAlterarSenha').addEventListener('submit', async (event) => {
    event.preventDefault();  // Impede o reload da página

    // Pega o valor da nova senha
    const novaSenha = document.getElementById('novaSenha').value.trim();

    // Valida se a nova senha foi preenchida corretamente
    if (!novaSenha || novaSenha.length < 6) {
        mostrarMensagem('A nova senha deve ter pelo menos 6 caracteres.', 'red');
        return;
    }

    // Pega o token armazenado no localStorage
    const token = localStorage.getItem('recuperacaoToken');

    if (!token) {
        mostrarMensagem('Token de recuperação não encontrado.', 'red');
        return;
    }

    // Chama a função para confirmar a recuperação de senha
    const { sucesso, msg } = await confirmarRecuperacaoSenha(token, novaSenha);

    // Mostra mensagem de sucesso ou erro
    if (sucesso) {
        mostrarMensagem(msg || 'Senha alterada com sucesso!', 'green');
        // Pode redirecionar para a página de login ou outra página após sucesso
        window.location.href = '/index.html';  // Exemplo de redirecionamento
    } else {
        mostrarMensagem(msg || 'Não foi possível alterar a senha. Tente novamente.', 'red');
    }
});
