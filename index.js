// import atau panggil package yang kita mau pake di aplikasi kita
const express = require('express');
const path = require("path")
const {product} = require("./models")
const { default: axios } = require('axios');

// framework utk http server
const app = express();
const PORT = 3000;

//public
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "controller")))


app.use(express.json());
app.use(express.urlencoded({ extended: true}))
// proses baca json 
const bodyParser = require('body-parser');

const routes = require('./routes');

// setting view engine
app.set("views",__dirname + "/views")
app.set("view engine", "ejs")


// url utama dari aplikasi
// req = request 
// res = response
// app.get('/', (req, res) => {
//     res.send('Hello FSW 3 yang luar biasa dari server nih !');
// })

//ngarah index ejs .tidak sepsifik karena ada diatasnya di setting view engine
app.get('/',(req, res) => {
    res.render("index", {
        name: 'Danar',
        status: 'tanda tanya',
        title: 'Hello FSQ 3 dari Client Side nih'
    })
})

//untuk admin shop
app.get('/admin/products', async (req, res) => {
    const products = await product.findAll();
    res.render("products/index", {
       products
    })
})





//Untuk create
app.get('/admin/products/create', async (req, res) => {
    res.render("products/create")
})

app.post('/products/create', async (req, res) => {
    const { name, price, stock } = req.body
    await product.create({
        name,
        price,
        stock
    })
    res.redirect(200, "/admin/products")
})


//update
app.get('/admin/products/edit/:id', async (req, res) => {
    // const productDetail = await product.findByPk(req.params.id);
    const productDetail = await axios.get(`http://localhost:3000/api/products/${req.params.id}`)
    // console.log(productDetail.data)
    res.render("products/edit", {
        title: "Edit",
        productDetail: productDetail.data
    })
})

app.post('/products/update/:id', async (req, res) => {
    const id = req.params.id
    const {name, price, stock} = req.body
    await product.update({
        name,
        price,
        stock
    }, {
        where: {
            id
        }
    })
    res.redirect(200, "/admin/products")
})


//delete
app.post('/products/delete/:id', async (req, res) => {
    const id = req.params.id
    await product.destroy({
        where: {
            id
        }
    })
    res.redirect(200, "/admin/products")
})


app.use(routes);

// memulai server nya
app.listen(PORT, () => {
    console.log(`App running on Localhost: ${PORT}`)
})