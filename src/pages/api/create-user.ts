import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import url from 'url'


let chachedDb: Db = null

async function connecToDataBase(uri: string) {
  if (chachedDb) {
    return chachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 

  const dbName = url.parse(uri).pathname.substr(1)

  const db = client.db(dbName)
  
  chachedDb = db

  return db
}

export default async (request: NowRequest, response: NowResponse) => {

  const {
    name, 
    email, 
    level, 
    currentExperience, 
    challengesCompleted
  } = request.body
  
  const db = await connecToDataBase(process.env.MONGODB_URI)
   
  const collection = db.collection('users')

  await collection.createIndex({ "email": 1 }, { unique: true } )

  const user = await collection.findOne({
    email
  })

  if (!user) {
    await collection.insertOne({
      name,
      email,
      level,
      currentExperience,
      challengesCompleted,
      subscribedAt: new Date(),
    })
  }

  return response.status(201).json(user)
}