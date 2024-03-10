export const animalRanges = [
  { min: -1, max: 14.4, result: 'AVESTRUZ' },
  { min: 14.4, max: 28.8, result: 'ÁGUIA' },
  { min: 28.8, max: 43.2, result: 'BURRO' },
  { min: 43.2, max: 57.6, result: 'BORBOLETA' },
  { min: 57.6, max: 72.0, result: 'CACHORRO' },
  { min: 72.0, max: 86.4, result: 'CABRA' },
  { min: 86.4, max: 100.8, result: 'CARNEIRO' },
  { min: 100.8, max: 115.2, result: 'CAMELO' },
  { min: 115.2, max: 129.6, result: 'COBRA' },
  { min: 129.6, max: 144.0, result: 'COELHO' },
  { min: 144.0, max: 158.4, result: 'CAVALO' },
  { min: 158.4, max: 172.8, result: 'ELEFANTE' },
  { min: 172.8, max: 187.2, result: 'GALO' },
  { min: 187.2, max: 201.6, result: 'GATO' },
  { min: 201.6, max: 216.0, result: 'JACARÉ' },
  { min: 216.0, max: 230.4, result: 'LEÃO' },
  { min: 230.4, max: 244.8, result: 'MACACO' },
  { min: 244.8, max: 259.2, result: 'PORCO' },
  { min: 259.2, max: 273.6, result: 'PAVÃO' },
  { min: 273.6, max: 288.0, result: 'PERU' },
  { min: 288.0, max: 302.4, result: 'TOURO' },
  { min: 302.4, max: 316.8, result: 'TIGRE' },
  { min: 316.8, max: 331.2, result: 'URSO' },
  { min: 331.2, max: 345.6, result: 'VEADO' },
  { min: 345.6, max: 360, result: 'VACA' }
]

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function easeInOutQuad(time) {
  return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time
}
