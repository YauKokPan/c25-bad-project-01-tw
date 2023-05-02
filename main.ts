import express from 'express'
import expressSession from 'express-session'
import path from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const client = new Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})
client.connect()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
	expressSession({
		secret: 'javidols',
		resave: false,
		saveUninitialized: true
	})
)
declare module 'express-session' {
	interface SessionData {
			counter?: number
		}
	}


app.use(express.static('public'))


app.use((req: express.Request, res: express.Response) => {
	res.status(404)
	res.sendFile(path.resolve('./public/404.html'))
})

const PORT = 8080

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`)
})