import { Metadata } from "next";
import React from "react";
import Listing from "./components/listing";

export const metadata: Metadata = {
  title: "BidYourStay: Your Ultimate Homestay Booking Platform",
  description:
    "Discover amazing deals on homestays with BidYourStay. Bid for the best prices and enjoy luxury accommodations at a fraction of the cost. Book now and start saving on your next adventure!",
  icons: "@/assets/images/bys_favicon_updated.png",
};

export default function Web() {
  return <Listing />;
}
