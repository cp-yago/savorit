import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  id: string;
  title: string;
  recipeCount?: number;
}

const boloTamara =
  "https://instagram.fdac5-1.fna.fbcdn.net/v/t51.2885-15/482193305_18264124231274350_5251889964020040413_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=instagram.fdac5-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2AFzFdJde-S0Q1N7yQn9HqdbAevHLmfYQDT3VRTyj6XVhSI6S012_SBQ3a-wdJt5mA4&_nc_ohc=gIJ4qkI8OosQ7kNvgHCT8ka&_nc_gid=c3a51d6f18464724a2efdaa3bdc51b17&edm=APs17CUBAAAA&ccb=7-5&oh=00_AYCGuz9ZvNsCzOpWN35nlHwj0_xAPD4tmt1bIPMZIk1K4Q&oe=67CE97FD&_nc_sid=10d13b";
const mostarda =
  "https://instagram.frec40-1.fna.fbcdn.net/v/t51.2885-15/475592772_472707549031765_1500265788467489070_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.frec40-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2AEQexkJZgProyBlOvuwKU17VKAce6seXop4yYSYcDHZ-v5nkTK4HIKyF7px1eHcxUQ&_nc_ohc=o88Vb6TPi-wQ7kNvgErd9Aa&_nc_gid=909d7b44465841bc8163de62ba847046&edm=APs17CUBAAAA&ccb=7-5&oh=00_AYA5LpcA5g6e1rPm6itArP3M-dFdFFHvW10tiyXJagLQlg&oe=67CFAA33&_nc_sid=10d13b";

export default function BookCard({
  id,
  title,
  recipeCount = 0,
}: BookCardProps) {
  return (
    <Link href={`/books/${id}`} className="block">
      <div className="h-50 grid gap-2 grid-cols-4 grid-rows-3 rounded-2xl border-2 p-1 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-white/10 cursor-pointer">
        <div className="relative col-span-2 row-span-2">
          <Image
            src={boloTamara}
            alt="Imagem"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="col-span-2 relative">
          <Image
            src={mostarda}
            alt="Imagem"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="col-span-2 relative">
          <Image
            src={mostarda}
            alt="Imagem"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="p-2 flex flex-col row-span-1 col-span-4">
          <h2>{title}</h2>
          <span className="text-gray">{recipeCount} receitas</span>
        </div>
      </div>
    </Link>
  );
}
