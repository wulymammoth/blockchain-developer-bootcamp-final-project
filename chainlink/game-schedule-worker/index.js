addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
/**
 * @param {Request} request
 */
async function handleRequest(request) {
  const initOpts = { headers: { 'content-type': 'application/json' } }
  const schedule = await gameSchedule(request)
  const dailySchedule = map(schedule, gamePresenter)
  return new Response(JSON.stringify(dailySchedule), initOpts)
}

function gamePresenter(game) {
  return {
    home: game['HomeTeam'],
    away: game['AwayTeam'],
    spread: game['PointSpread'],
    time: game['DateTimeUTC'],
    status: game['Status'],
  }
}

async function gameSchedule(request) {
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
  let day = String(today.getDate())
  day = day.length < 2 ? '0' + day : day // NOTE: (padding) not sure if this is needed
  const date = `${year}-${month}-${day}`
  return date
}

function map(collection, mapper) {
  const newCollection = []
  for (let i = 0; i < collection.length; ++i) {
    newCollection.push(mapper(collection[i]))
  }
  return newCollection
}
