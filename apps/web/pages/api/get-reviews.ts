import type { NextApiRequest, NextApiResponse } from "next";

export type Review = {
  text: string;
  rating: number;
  author_name: string;
};

const placeId = "ChIJFyqiVMUjbEcRMUc5UtW6E0Q";
const apiKey = process.env.NEXT_PUBLIC_PLACES_KEY;

const getReviews = async (
  req: NextApiRequest,
  res: NextApiResponse<Review[] | { error: string }>
) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}&language=${req.query.language}`;
    const details = await fetch(url);
    const data = await details.json();

    console.log(url);
    console.log(data);

    if (!data || !data.result) {
      res.status(500).json({ error: "Invalid data from Places API" });
      return;
    }

    const {
      result: { reviews },
    } = data;
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error in /api/get-reviews:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching reviews." });
  }
};

export default getReviews;
