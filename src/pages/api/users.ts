import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {

  const { db } = await connectToDatabase();
  const users = await db
    .collection("users")
    .find({})
    .limit(20)
    .sort({ totalExperience: -1})
    .toArray();
    
  res.json(users);
};