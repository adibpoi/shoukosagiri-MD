import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

const data = await youtubedl('https://www.youtube.com/watch?v=yGDpGEUfCck&list=RDMM&index=15')
console.log(data) // JSON