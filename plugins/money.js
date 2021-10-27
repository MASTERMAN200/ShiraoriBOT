let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        pasangan: '',
      }
    }
    let { name, limit, money, exp, lastclaim, registered, regTime, age, level, role, banned, pasangan } = global.db.data.users[who]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let str = `
Nama: ${username} ${registered ? '(' + name + ') ' : ''}(@${who.replace(/@.+/, '')})${about != 401 ? '\nInfo: ' + about : ''}
${ pasangan ? `Pasangan: *${conn.getName(pasangan)}* ${global.db.data.users[pasangan].registered ? "(" + global.db.data.users[pasangan].name + ") " : ""}(@${pasangan.replace( /@.+/, "" )})` : "Jomblo"}
`.trim()
    let mentionedJid = [who]
    { contextInfo: { mentionedJid } })
  }
}
handler.help = ['pasangan']
handler.tags = ['main']
handler.command = /^pasangan?$/i
module.exports = handler