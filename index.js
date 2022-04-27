import dotenv from "dotenv";dotenv.config();
import express from "express"; // importando express
import path from "path"; // serve para definir caminhos padrões

const __dirname = path.resolve(path.dirname("")); //__dirname serve para informar qual é o caminho padrão da minha pasta

const app = express(); //intanciando o express dentro da const

app.use(express.urlencoded({ extended: true })); // o corpo (body) da requisição
app.use(express.json()); // converter as info para json

app.set("view engine", "ejs"); // faz com que o express reconheça o ejs como motor de visualização
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.port || 3005;
app.listen(port, () => {
  //listen é uma função do express para criar servidor
  console.log(`Rodando na porta ${port} `);
});

let pokemon = [
  {
    id: 1,
    nome: "Bulbasaur",
    tipo1: "Planta",
    altura: "0,7",
    peso: "6,9",
    categoria: "Semente",
    habilidades: "Superar",
    genero: "Macho, Femêa",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  },
  {
    id: 2,
    nome: "Charmander",
    tipo1: "Fogo",
    altura: "0,6",
    peso: "8,5",
    categoria: "Lagarto",
    habilidades: "Chama",
    genero: "Macho, Femêa",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
  },
  {
    id: 3,
    nome: "Squirtle",
    tipo1: "Agua",
    altura: "0,5",
    peso: "9,0",
    categoria: "Tartaruga",
    habilidades: "Torrente",
    genero: "Macho, Femêa",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
  },
  {
    id: 4,
    nome: "Cyndaquil ",
    tipo1: "Fogo",
    altura: "0,5",
    peso: "7,9",
    categoria: "Rato de fogo",
    habilidades: "Chama",
    genero: "Macho, Femêa",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/155.png",
  },
];

app.get("/", (req, res) => {
  //get é um metodo HTTP/HTTPS que serve para trazer uma pagina
  res.render("index.ejs", {
    pokemon,
  });
});

app.get("/detalhes/:id", (req, res) => {
  req.params.id;
  let poke = [];
  pokemon.filter((element) => {
    if (element.id == req.params.id) {
      poke = element;
    }
  });

  res.render("detalhes.ejs", {
    poke,
  });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro.ejs");
});

app.post("/cadastro", (req, res) => {
  let i = pokemon[pokemon.length - 1].id + 1;

  const { nome, tipo1, altura, peso, categoria, habilidades, genero, img } =
    req.body;
  pokemon.push({
    id: i,
    nome,
    tipo1,
    altura,
    peso,
    categoria,
    habilidades,
    genero,
    img,
  });
  console.log(pokemon);
  res.redirect("/");
});
