export const categories = ['All', 'Decor', 'Costumes', 'Candy', 'Lighting', 'Party']

const p = (id, name, category, price, emoji, tone, description) => ({ id, name, category, price, emoji, tone, description })

export const products = [
  p(1, 'Carved Pumpkin Trio', 'Decor', 24.99, '🎃', '#ff7a1a', 'Three hand-finished foam pumpkins in graduated sizes. Light, weatherproof and reusable every year.'),
  p(2, 'Cobweb Curtain', 'Decor', 12.5, '🕸️', '#8a8494', 'A stretchable web that covers a doorway or a whole window. Comes with a plastic spider.'),
  p(3, 'Skeleton Sentinel, 5 ft', 'Decor', 39, '💀', '#e8dcc8', 'Posable joints and glow-in-the-dark eye sockets. Sits, stands or leans on your porch rail.'),
  p(4, 'Witch Hat & Cape Set', 'Costumes', 34.9, '🧙', '#6b3fa0', 'Wide-brim hat and a full-length hooded cape with a clasp. Fits teens and adults.'),
  p(5, 'Vampire Collar Cloak', 'Costumes', 29.9, '🧛', '#b3202f', 'Satin-lined cloak with a tall collar and a red inner lining. One size.'),
  p(6, 'Ghost Bedsheet Kit', 'Costumes', 15.9, '👻', '#f3e9dc', 'Pre-cut ghost costume with eye holes and a soft drape. Machine washable.'),
  p(7, 'Candy Corn Jar, 1 kg', 'Candy', 14.5, '🍬', '#ffb020', 'Classic tri-color candy corn in a resealable jar. Enough for about 60 trick-or-treaters.'),
  p(8, 'Trick-or-Treat Mix', 'Candy', 19.9, '🍭', '#ff5a7a', 'A 2 kg bag of individually wrapped chocolates, gummies and lollipops.'),
  p(9, 'Spooky Cookie Cutters', 'Candy', 9.9, '🦇', '#c9b8e0', 'Set of six stainless steel cutters: bat, ghost, cat, coffin, pumpkin and skull.'),
  p(10, 'Flicker Lantern Set', 'Lighting', 27, '🕯️', '#ff9a3c', 'Four battery-powered lanterns with a candle-like flicker and a six-hour timer.'),
  p(11, 'Purple Glow String Lights', 'Lighting', 18.75, '🔮', '#9b5de5', '10 m of warm-purple LEDs with eight modes. Plug-in, indoor and outdoor.'),
  p(12, 'Fog Machine Mini', 'Party', 44.9, '🌫️', '#7c8a99', 'Compact fog machine with a wireless remote. Fills a small room in under a minute.'),
  p(13, 'Bat Garland, 3 m', 'Party', 11.5, '🦇', '#3b2f4a', 'Hundreds of paper bats on a string. Hang above tables, doors or stairs.'),
  p(14, 'Black Cat Balloons x12', 'Party', 8.9, '🐈‍⬛', '#211a26', 'Twelve latex balloons in matte black and orange with cat silhouettes.')
]

export const getProduct = (id) => products.find((x) => x.id === Number(id))
export const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
