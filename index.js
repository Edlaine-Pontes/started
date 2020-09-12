const express = require('express');

const bodyParser = require('body-parser'); // add para retornar o json 
const { request, response } = require('express');

const app = express();

app.use(bodyParser.json()) 


const PORT = 3001

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

const listenFunction = () => console.log('Servidor funcionando: hello')

app.listen(PORT, listenFunction)

const books = [
    {
        name: 'Harry Potter',
        autor: 'JK',
        id: 1
    }
]

const listBooks = (request, response) => {
    
    return response.status(200).send(books)
}

const creatBook = (request, response)=>{ // request é o que recebi e response o que eu vou enviar
    const book = request.body
    console.log('BOOK', book);
    books.push(book)
    if(book.name && book.autor && book.id){
        return response.status(201).send({message: 'Livro Cadastro com Sucesso!'})
    }else{
        return response.status(400).send({message: 'Falta enviar o body corretamente'})
    }
}

const deleteBook = (request, response)=>{
    const id = request.params.id
    console.log('id',id)
    var isFoundBook = false;
    
    if(books.length > 0){
        books.find((element,index)=>{
            if(element.id == id){
                isFoundBook = true
                books.splice(index,1)    
            }
        })
    }
    if(isFoundBook){
        return response.status(201).send({ message: "Livro excluido com Sucesso"})        
    }else{
        return response.status(400).send ({ message : 'Livro não encontrado'})
    }    
}



const updateBook = (request, response) =>{
    const id = request.params.id
    if(id){
        return response.status(201).send({message: "Registro atualizado com sucesso"})
    }else{
        return response.status(400).send({message: "Falta enviar ID na url"})
    }
}


app.get('/book', listBooks) // vai listar

app.post('/book', creatBook) // vai receber dados

app.delete('/book/:id', deleteBook) // vai deletar algum dado

app.put('/book/:id', updateBook) // vai atualizar

