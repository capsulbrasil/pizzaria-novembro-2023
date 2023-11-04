import { init, makeRouter } from 'sonata-api'
export * as collections from './collections'

const router = makeRouter()

router.GET('/hello-world', (_context) => {
  // o retorno desse callback vai ser a resposta do endpoint
  // o parâmetro context é fortemente tipado, você pode ver
  // as propriedades dele através do autocompletion
  //
  // também não é necessário try/catch, as exceções são capturadas
  // automaticamente num nível superior

  return {
    message: 'Hello, world!'
  }
})


router.GET("/drink/non-alcoholic", async (_context) => {
  const nonAlchool =  await _context.collections.drink.functions.getAll(
    { filters: { 
        isalcoholic: { $ne: true }
      }
    });
    
  return nonAlchool;
});

router.GET("/combo/cheaperthan", async (_context) => {
  console.log(_context.request.query);
  const price: number = +_context.request.query.price;
  const combosCheaperThanPrice = await _context.collections.combo.functions.getAll(
    { filters: { 
      price: { $lte: price} 
    }
  });

  return combosCheaperThanPrice;
});

init(null, (context) => {
  return router.install(context)
})
