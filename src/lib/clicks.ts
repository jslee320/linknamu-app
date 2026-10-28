import { getDb } from "@/lib/mongodb";

type ClickDoc = { _id: string; clicks: number };

const COLLECTION = "clicks";

export async function getClicksMap(): Promise<Record<string, number>> {
  const db = await getDb();
  const docs = await db.collection<ClickDoc>(COLLECTION).find().toArray();
  return docs.reduce<Record<string, number>>((acc, doc) => {
    acc[doc._id] = doc.clicks;
    return acc;
  }, {});
}

export async function incrementClick(linkId: string): Promise<number> {
  const db = await getDb();
  const result = await db.collection<ClickDoc>(COLLECTION).findOneAndUpdate(
    { _id: linkId },
    { $inc: { clicks: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  return result?.clicks ?? 1;
}
