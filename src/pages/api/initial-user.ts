import { NowRequest, NowResponse } from "@vercel/node";
import { connectToDatabase } from "../../util/mongodb";

export default async (request: NowRequest, response: NowResponse) => {

  const { email, name, image } = request.body
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ email });
  
  if (user) {
    return response.status(201).json(user)
  }  

  await db.collection("users").createIndex({ "email": 1 }, { unique: true } )

  const new_user = {
    name,
    email,
    image,
    level: 1,
    currentExperience: 0,
    challengesCompleted: 0,
    totalExperience: 0,
    subscribedAt: new Date(),
  }

  await db.collection("users").insertOne(new_user)

  return response.status(201).json(new_user);
}