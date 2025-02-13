const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para processar o corpo das requisições como JSON
app.use(bodyParser.json());

// Endpoint para receber as notificações do Webhook da RisePay
app.post('/webhook/pagamento', (req, res) => {
    const pagamento = req.body;  // Dados do pagamento enviados pela RisePay

    console.log('Recebido webhook:', pagamento);

    // Verifique o status do pagamento
    if (pagamento.status === 'aprovado') {
        // Atualize o banco de dados ou a lógica de sucesso
        console.log('Pagamento aprovado!');
        
        // Se o pagamento foi aprovado, você pode redirecionar o usuário para a página de sucesso
        // ou enviar um e-mail de confirmação, etc.
        // No caso de um pagamento aprovado, vamos redirecionar o usuário:
        // (Isso pode ser feito por um status de resposta ou qualquer outra lógica no front-end).
    } else if (pagamento.status === 'falhou') {
        console.log('Pagamento falhou!');
        // Tratar falha no pagamento
    }

    // Responder com sucesso para que o RisePay saiba que recebeu o webhook
    res.status(200).send('Webhook recebido com sucesso');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
