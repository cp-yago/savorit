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
    <Link href={`/books/${id}`} key={id} className="block hover-scale">
      <div className="bg-white rounded-3xl p-2 border border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1 row-span-2">
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
          <div className="col-span-1">
            <div className="rounded-2xl overflow-hidden h-full">
              <Image
                src={images[1] || placeholderImage}
                alt=""
                width={200}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="rounded-2xl overflow-hidden h-full">
              <Image
                src={images[2] || placeholderImage}
                alt=""
                width={200}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="font-bold text-lg">{name}</h2>
          <p className="text-sm text-gray-500">{recipeCount} receitas</p>
        </div>
      </div>
    </Link>
  );
}
