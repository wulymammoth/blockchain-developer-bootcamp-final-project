addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const opts = { headers: { 'content-type': 'application/json' } }

  const gameCollection = map(await games(request), (rawGame) =>
    gamePresenter(rawGame['Game']),
  )
  return new Response(JSON.stringify(gameCollection), opts)
}

function map(collection, mapper) {
  const newCollection = []
  for (let i = 0; i < collection.length; ++i) {
    newCollection.push(mapper(collection[i]))
  }
  return newCollection
}

function gamePresenter(game) {
  const home = game['HomeTeam']
  const away = game['AwayTeam']
  const homeScore = game['HomeTeamScore']
  const awayScore = game['AwayTeamScore']

  const [winner, loser] = homeScore > awayScore ? [home, away] : [away, home]

  return {
    home: home,
    away: away,
    loser: loser,
    winner: winner,
    score: [Math.max(homeScore, awayScore), Math.min(homeScore, awayScore)],
  }
}

async function games(request) {
  const url = [API_URL, PATH, date(request), `?key=${SPORTSDATA_KEY}`].join('')
  const options = { 'Content-Type': 'application/json;charset=UTF-8' }
  const res = await fetch(new Request(url), options)
  return await res.json()
}

function date(request) {
  const MONTHS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]
  const today = new Date()
  const year = today.getFullYear()
  const month = MONTHS[today.getMonth()]
  let day = String(today.getDate() - 1)
  day = day.length < 2 ? '0' + day : day // NOTE: (padding) not sure if this is needed
  const date = `${year}-${month}-${day}`
  return date
}
