const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3333;


app.use(express.json());


app.get('/agendamentos', (req, res) => {
    fs.readFile('agendamentos.json', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send("Falha ao obter os dados")
            return
        }
        const agendamentos = JSON.parse(data)
        res.json(agendamentos)
    })
})

app.get('/agendamento/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('agendamentos.json', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send("Falha ao obter os dados")
            return
        }
        const agendamentos = JSON.parse(data)
        const index = agendamentos.findIndex((agendamento) => agendamento.id == id)
        if (index === -1) {
            res.status(404).send('Agendamento não encontrado')
            return
        }
        res.json(agendamentos[index])
    })
})


app.post('/agendar', (req, res) => {
    fs.readFile('agendamentos.json', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('Falha ao acessar dados')
            return
        }
        const agendamentos = JSON.parse(data)
        const novoAgendamento = {
            id: agendamentos.length + 1,
            data: req.body.data,
            hora: req.body.hora,
            descricao: req.body.descricao
        }
        agendamentos.push(novoAgendamento)
        fs.writeFile('agendamentos.json', JSON.stringify(agendamentos, null, 2), (err) => {
            if (err) {
                console.error('Falha ao inserir dados')
                res.status(500).send('Falha ao inserir dados')
                return
            }
            res.json(novoAgendamento)
        })
    })
})

app.put('/agendamento/:id', (req, res) => {
    const id = req.params.id
    const novosDados = req.body

    fs.readFile('agendamentos.json', (err, data) => {
        if (err) {
            console.error('Falha ao acessar dados')
            res.status(500).send('Falha ao acessar dados')
            return
        }
        let agendamentos = JSON.parse(data)
        const index = agendamentos.findIndex((agendamento) => agendamento.id == id)
        if (index === -1) {
            res.status(404).send('Agendamento não encontrado')
            return
        }
        agendamentos[index] = { ...agendamentos[index], ...novosDados }

        fs.writeFile('agendamentos.json', JSON.stringify(agendamentos, null, 2), (err) => {
            if (err) {
                console.error('Falha ao atualizar dados de agendamento')
                res.status(500).send('Falha ao atualizar dados de agendamento')
                return
            }
            res.json({ message: 'Agendamento atualizado com sucesso' })
        })
    })
})

app.delete('/agendamento/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('agendamentos.json', (err, data) => {
        if (err) {
            console.error('Falha ao acessar dados')
            res.status(500).send('Falha ao acessar dados')
            return
        }
        let agendamentos = JSON.parse(data)
        const index = agendamentos.findIndex((agendamento) => agendamento.id == id)
        if (index === -1) {
            res.status(404).send('Agendamento não encontrado')
            return
        }
        agendamentos.splice(index, 1)

        fs.writeFile('agendamentos.json', JSON.stringify(agendamentos, null, 2), (err) => {
            if (err) {
                console.error('Falha ao remover agendamento:', err);
                res.status(500).send('Falha ao remover agendamento');
                return;
            }
            res.json({ message: 'Agendamento removido com sucesso' });
            return;
        });
    })
})


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});