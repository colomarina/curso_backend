import React from "https://dev.jspm.io/react/index.js";

type TypeForm = {
  colores: string[]
}

const ScriptsBootstrap = () => (
  <>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
  </>
)

const Formulario = ({ colores }: TypeForm) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>SERVEST</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="container pt-5">
          <form method="GET" action="/">
            <div className="form-group">
              <label htmlFor="color">Enter a color</label>
              <input type="text" className="form-control" id="color" name="color" placeholder="Enter a color" />
            </div>
            <button type="submit" className="btn btn-success" >Send</button>
          </form>
          <div>
            <h2>Colors</h2>
            <div className="container">
              <ul className="list-group">
                {colores.map((color: string) => <li key={color} className="list-group-item mt-3" style={{ color:`${color}`, backgroundColor: "black"}}>{color}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <ScriptsBootstrap />
      </body>
    </html>
  )
}

export default Formulario;