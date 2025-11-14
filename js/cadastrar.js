import { cadastrarUsuario } from '../api/usuarios.js';
import { mostrarMensagem } from '../api/utils.js';

document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obter os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    const categoria = document.getElementById('categoria').value;

       // Validação simples
    if (!email || !senha || !nome || !confirmaSenha) {
        mostrarMensagem('Por favor, preencha todos os campos.', 'red');
        return;
    }

    // Validação de senha
    if (senha !== confirmaSenha) {
        mostrarMensagem('As senhas não coincidem!', 'red');
        return;
    }

    // Desabilitar o botão enquanto a requisição está sendo feita
    const botao = document.getElementById('cadastrar');
    botao.disabled = true;
    botao.textContent = 'Cadastrando...';

    // Tentar cadastrar o usuário
    const { sucesso, msg } = await cadastrarUsuario(nome, email, senha, categoria);

    // Reabilitar o botão após a requisição
    botao.disabled = false;
    botao.textContent = 'Cadastrar-se';

    // Mostrar mensagem de erro ou sucesso
    if (sucesso) {
        mostrarMensagem('Cadastro realizado com sucesso! Redirecionando...', 'green');
        setTimeout(() => {
            window.location.href = 'index.html'; // Redireciona para a página de login após o cadastro
        }, 1500);
    } else {
        mostrarMensagem(msg, 'red');
    }
});

