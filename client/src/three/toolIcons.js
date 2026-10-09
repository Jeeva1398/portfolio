import {
  siApachespark,
  siDatabricks,
  siDocker,
  siExpress,
  siHuggingface,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOllama,
  siPython,
  siReact,
  siTypescript,
} from 'simple-icons'

// Tool name (as written in `stackUnits.tools`) -> Simple Icons logo. Paths use a 24x24 viewBox.
export const toolIcons = {
  React: siReact,
  'Node.js': siNodedotjs,
  Express: siExpress,
  TypeScript: siTypescript,
  MongoDB: siMongodb,
  MySQL: siMysql,
  Ollama: siOllama,
  'Hugging Face': siHuggingface,
  Python: siPython,
  'Apache Spark': siApachespark,
  Databricks: siDatabricks,
  Docker: siDocker,
}

// Shared layout for the WebGL scene and its CSS fallback, in scene units (x right, z toward the
// viewer). Cards sit in an arc behind the core; tool tiles sit in front, two rows deep, grouped by
// layer with a wider gap between groups so each cluster reads as one.
export function hubLayout(units) {
  const cards = [
    { x: -2.45, z: -2.05 },
    { x: 0, z: -2.65 },
    { x: 2.45, z: -2.05 },
  ].map((pos, i) => ({ ...pos, unit: i }))

  const PITCH = 0.92
  const GROUP_GAP = 0.34
  const tiles = []
  const columns = []
  let x = 0
  units.forEach((unit, u) => {
    const cols = Math.ceil(unit.tools.length / 2)
    for (let c = 0; c < cols; c++) {
      columns.push({ x, unit: u })
      unit.tools.slice(c * 2, c * 2 + 2).forEach((name, row) => tiles.push({ name, unit: u, col: columns.length - 1, row }))
      x += PITCH
    }
    x += GROUP_GAP
  })
  const width = x - PITCH - GROUP_GAP
  columns.forEach((col) => (col.x -= width / 2))
  tiles.forEach((tile) => {
    tile.x = columns[tile.col].x
    tile.z = 2.0 + tile.row * 0.9
  })
  return { cards, tiles, columns }
}
