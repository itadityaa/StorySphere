import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8">
      <section className="md:w-1/2 w-full text-justify">
        <h1 className="md:text-5xl text-3xl md:py-12 font-bold md:leading-tight">
          Welcome to StorySphere – Your World of Endless Stories
        </h1>
        <p>
          Dive into a universe where stories come to life. Whether you're a
          reader searching for your next adventure or a writer ready to share
          your tale, StorySphere is your space to explore, create, and connect
          with a community of storytellers and enthusiasts alike.
        </p>
      </section>
      <Carousel />
    </div>
  );
};

export default Banner;
