import Mockup from './mockup';

// import AppStoreButton from './AppStoreButton';
// import PlayStoreButton from './PlayStoreButton';


export const heroDetails = {
  heading: '🔎 A melhor forma de encontrar e organizar suas receitas das redes sociais',
  subheading: 'Salve, organize e aprimore receitas do Instagram com inteligência e praticidade.',
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pb-0 px-5"
    >
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]">
      </div>

      <div className="text-center">
        <h1 className="text-2xl md:text-2xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">{heroDetails.heading}</h1>
        <p className="mt-4 text-foreground max-w-lg mx-auto">{heroDetails.subheading}</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
          {/* <AppStoreButton dark />
                    <PlayStoreButton dark /> */}
        </div>
        <Mockup />
      </div>
    </section>
  );
};
