const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = 3000;
const app = express();
app.use(bodyParser.json())

app.get('/',() => 
{
    console.log('helkidlo');
});

app.get('/book',async (req,res) =>
{
    const books = await prisma.book.findMany();
    res.json(books);
})

app.get('/book/:id',async (req,res) => 
{
    const bookId = parseInt(req.params.id);
    const book = await prisma.book.findUnique(
        {
            where: {id: bookId}
        }
    )
    res.json(book);
})

app.post('/book',async (req,res) =>
{
    const {name,pages,author} = req.body;
    const createdBook = await prisma.book.create(
        {
            data: {
                name,
                pages,
                author
            }
        }
    )
    res.json(createdBook);
})

app.patch('/book/:id', async (req,res) =>
{
    const {name,pages,author}  = req.body;
    const bookId  = req.params.id;
    const updatedBook = await prisma.book.update(
        {
            where: {id: parseInt(bookId)},
            data: {
                name,
                pages,
                author
            }
        }
    )
    res.json(updatedBook);
})

app.delete('/book/:id', async (req, res) => 
{
    const bookId = req.params.id;
    const deleteBook = await prisma.book.delete(
        {
            where : {id : parseInt(bookId)}
        }
    )
    res.json(deleteBook);
})

app.listen(PORT,() =>
{
    console.log(`Server is running on port ${PORT}`);
})