# Ice Breakers
Ice breakers er en applikasjon som tilbyr en oversikt over bli-kjent leker/ice-breaker aktiviteter. Brukere kan søke opp spesifikke leker, eller opprette sine egne.

Med lekene følger det en tittel, et bilde og en beskrivelse. På hjemmesiden er det en listevisning med et utvalg av leker, men brukere kan også trykke seg inn på spesifikke leker for å få mer informasjon.

## Motivasjon
Mange unge synes det kan være vanskelig å knytte nye bekjentskap. Målet med applikasjonen er å gjøre det enklere å ta initiativ for å bli kjent med nye mennesker. 

## Teammedlemmer
- [Adrian Dahlen Haugen](https://gitlab.stud.idi.ntnu.no/adriandh)
- [Artemis Kjøllmoen Aarø](https://gitlab.stud.idi.ntnu.no/joakiaa)
- [Athina Thayananthan](https://gitlab.stud.idi.ntnu.no/athinat)
- [Haakon Karstensen](https://gitlab.stud.idi.ntnu.no/haakkar)
- [Jakob Tøssebro](https://gitlab.stud.idi.ntnu.no/jakobto)
- [Oda Mathea Sjaavik](https://gitlab.stud.idi.ntnu.no/odamsj)
- [Olav Hirth Brattetveit](https://gitlab.stud.idi.ntnu.no/olavhbr)

## Teknologier og rammeverk
Fullstack [Node.js](https://nodejs.org/en) miljø med [JavaScript](https://www.javascript.com/) på server og [TypeScript](https://www.typescriptlang.org/) i klienten.
### Frontend
- [React](https://react.dev/) [(Vite)](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)

### Backend
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Installasjon og kjøring
**1. Klon repoet fra GitLab**

`git clone https://gitlab.stud.idi.ntnu.no/tdt4140-2024/produktomraade-2/gruppe-26/ice-breakers.git`

**2. Installer nødvendige packages**
```shell
cd client
npm install
```
```shell
cd server
npm install
```
**3. Kjør backend**
```shell
cd server
npm run dev
```
**4. Kjør frontend**
```shell
cd client
npm run dev
```
Nettsiden kan finnes på URL: http://localhost:5173/
