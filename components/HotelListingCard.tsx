"use client";
import { HeartIconOutline } from "@/public/data/icons";
import { HeartIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

const tooltipStyle = {
  backgroundColor: "#3539E9",
  color: "#fff",
  borderRadius: "10px",
};


const HotelListingCard = ({ item }: { item: any }) => {
  const [favorite, setFavorite] = useState(false);
  const {
    id,
    banner_images,
    location_name,
    starting_price,
    highest_price,
    ratings,
    hotel_name,
    // Extract amenities using a loop
    ...amenitiesData // This will gather all remaining properties
  } = item;

   // Create an array of amenities dynamically
  const amenities = [];
  for (let i = 1; i <= 30; i++) { // Adjust the upper limit as needed
    const amenityName = amenitiesData[`amenity_name${i}`];
    const amenityLogo = amenitiesData[`amenity_logo${i}`];

    // Push to the array if both name and logo are available
    if (amenityName && amenityLogo) {
      amenities.push({ name: amenityName, logo: amenityLogo });
    }
  }

  return (
    <div className="col-span-12 md:col-span-6">
      <div className="relative rounded-2xl p-3 bg-white">
        <div className="property-card__head">
          <div className="property-card__img">
            <Image
              width={400}
              height={306}
              src={banner_images[0]} // Use the first banner image
              alt={hotel_name}
              className="w-full rounded-2xl"
            />
          </div>
          <button
            onClick={() => setFavorite(!favorite)}
            className="absolute z-10 inline-block text-primary top-6 right-6 rounded-full bg-white p-2.5"
          >
            {favorite ? (
              <HeartIcon className="w-5 h-5 text-[var(--tertiary)]" />
            ) : (
              <HeartIconOutline />
            )}
          </button>
        </div>
        <div className="mt-4 p-4">
          <div className="flex justify-between mb-2">
            <Link
              href="/componentshotel-listing-details"
              className="block text-xl font-medium"
            >
               {hotel_name}
            </Link>
            <div className="flex items-center shrink-0">
              <i className="text-[var(--tertiary)] text-lg las la-star"></i>
              <span className="block text-[var(--neutral-700)]">{ratings}</span>
            </div>
          </div>
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-1">
              <i className="las la-map-marker-alt text-xl text-[var(--tertiary)]"></i>
              <span className="inline-block">{location_name}</span>
            </div>
          </div>
          <ul className="flex items-center flex-wrap justify-between gap-1">
            <li>
              <div
                data-tooltip-id="parking"
                className="grid place-content-center w-10 h-10 rounded-full bg-[var(--primary-light)]"
              >
                <Image
                  width={24}
                  height={24}
                  src="/img/icon-car-parking.png"
                  alt="image"
                  className="w-7 h-7 object-fit-contain"
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="border-b border-dash-long mx-3">
          <div className="hr-dashed"></div>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap justify-between items-center">
            <span className="block text-xl font-medium text-primary">
              ${starting_price}
              <span className="inline-block font-medium text-primary">
                - ${highest_price}
              </span>
            </span>
            <Link
              href="/hotel-listing-details"
              className="btn-outline text-primary"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelListingCard;
