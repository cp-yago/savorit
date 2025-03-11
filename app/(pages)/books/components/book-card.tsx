import placeholderImage from "@/public/img/placeholder.png";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  id: string;
  name: string;
  recipeCount: number;
  images: string[];
}

export default function BookCard({
  id,
  name,
  recipeCount,
  images = [],
}: BookCardProps) {
  return (
    <Link
      href={`/books/${id}`}
      key={id}
      className="block hover-scale rounded-3xl"
    >
      <div className="bg-white rounded-3xl p-2 border border-gray-200 h-full flex flex-col">
        <div className="relative h-48 md:h-56">
          <div className="absolute top-0 left-0 w-1/2 h-full pr-1">
            <div className="rounded-2xl overflow-hidden h-full">
              <Image
                src={images[0] || placeholderImage}
                alt=""
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-1/2 pl-1 pb-1">
            <div className="rounded-2xl overflow-hidden h-full">
              <Image
                src={images[1] || placeholderImage}
                alt=""
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 pl-1 pt-1">
            <div className="rounded-2xl overflow-hidden h-full">
              <Image
                src={images[2] || placeholderImage}
                alt=""
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h2 className="font-bold text-lg truncate">{name}</h2>
          <p className="text-sm text-gray-500">{recipeCount} receitas</p>
        </div>
      </div>
    </Link>
  );
}
