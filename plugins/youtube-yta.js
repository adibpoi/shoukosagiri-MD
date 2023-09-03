import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
var handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Urlnya Mana Bang? >:('
  let q = '128kbps'
  let v = args[0]

  await conn.sendMessage(m.chat, {
    react: {
      text: '📥',
      key: m.key,
    },
  });
  
  // Ambil info dari video
  const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
  const dl_url = await yt.audio[q].download()
  const ttl = await yt.title
  const thumbnail = await yt.thumbnail
  const size = await yt.audio[q].fileSizeH

  // Tampilkan informasi file beserta thumbnail
  const info = `
[ YouTube Audio Downloader ]
● Judul: ${ttl}
● Ukuran: ${size}
● Link YouTube: ${v}`


  // Kirim pesan dan file audio ke user
  await conn.sendMessage(m.chat, { 
    image: {url: thumbnail},
    caption: info
  }, {quoted: m})

  await conn.sendMessage(
    m.chat, 
    { audio: { url: dl_url }, mimetype: 'audio/mp4' },
    { url: "Media/audio.mp3" }, // can send mp3, mp4, & ogg
    { quoted: m }
)
}

// Jika ingin menambahkan tag, ubah code berikut:
handler.tags = ['downloader']
handler.help = ['ytmp3 <link>']
handler.command = /^ytmp3$/i

handler.register = true
handler.limit = true

export default handler
