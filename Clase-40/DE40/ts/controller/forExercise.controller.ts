import { Request, Response } from 'express';
import { cpus } from "os";


module.exports = {

  getInfo: (req: Request, res: Response) => {
    res.json({
      ArgumentosDeEntrada: `Argumentos ${process.argv}`,
      PathDeEjecucion: process.execPath,
      NombreDeLaPlataforma: process.platform,
      ProcessId: process.pid,
      VersionDeNodeJS: process.version,
      CarpetaCorriente: process.cwd(),
      UsoDeMemoria: process.memoryUsage(),
      NumeroDeProcesadores: cpus().length,
    })
  },
}