console.log({
  ArgumentosDeEntrada: 'Nose',
  PathDeEjecucion: process.execPath,
  NombreDeLaPlataforma: process.platform,
  ProcessId: process.pid,
  VersionDeNodeJS: process.version,
  CarpetaCorriente: process.cwd(),
  UsoDeMemoria: process.memoryUsage(),
})