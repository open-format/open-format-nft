import Link from "next/link";

const navigation = [
  { name: "Trending", href: "/" },
  { name: "Top", href: "/about" },
  { name: "Art", href: "/art" },
  { name: "Collectables", href: "/events" },
  { name: "Music", href: "/articles" },
  { name: "Photography", href: "/contribute-art" },
  { name: "Articles", href: "/contribute-audio" },
  { name: "Sports", href: "/contribute-event" },
];

const Container: React.FC = () => {
  return (
    <>
      <div className="my-12 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl leading-8 font-extrabold tracking-tight text-gray-900">
            Explore Collections.
          </h1>
          <h2 className="mt-4 text-slate-700">
            Bringing the open format community together.
          </h2>
        </div>
      </div>
      <nav aria-label="Top">
        <div className="w-full py-6 flex items-center justify-center border-b border-slate-700 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              {/* Logo goes here at some point */}
            </a>
            <div className="hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-slate-500 hover:text-slate-700"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-500 hover:text-slate-700"
            >
              {link.name}
            </a>
          ))}
        </div>
        <hr className="divide-y"></hr>
      </nav>
      <div className="mt-12 px-6 grid grid-cols-1 gap-y-10 gap-x-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:gap-y-4">
        <Link href={"/"}>
          <div className="cursor-pointer hover:shadow-md hover:shadow-slate-300 transition-shadow flex flex-col border-2 max-h-max rounded-lg sm:overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt=""
              className=" h-52 object-cover"
            />
            <div className="-m-6 flex justify-start items-center flex-col">
              <img
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                alt=""
                className=" w-12 h-12 border-2 shadow-sm  border-white flex justify-center items-center overflow-hidden relative rounded-full object-cover"
              />
            </div>
            <div className="flex h-48 flex-col text-center p-2 mt-2 justify-center items-center">
              <p>Woman holding phone</p>
              <p>
                by <span className="text-blue-500">0x2858b....0FF334</span>
              </p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis tempore sapiente nesciunt velit debitis odit illo
                tenetur sequi cum et.
              </p>
            </div>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="cursor-pointer hover:shadow-md hover:shadow-slate-300 transition-shadow flex flex-col border-2 max-h-max rounded-lg sm:overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt=""
              className="h-52 object-cover"
            />
            <div className="-m-6 flex justify-start items-center flex-col">
              <img
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                alt=""
                className="w-12 h-12 border-2 shadow-sm  border-white flex justify-center items-center overflow-hidden relative rounded-full object-cover"
              />
            </div>
            <div className="flex h-48 flex-col text-center p-2 mt-2 justify-center items-center">
              <p>Woman holding phone</p>
              <p>
                by <span className="text-blue-500">0x2858b....0FF334</span>
              </p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis tempore sapiente nesciunt velit debitis odit illo
                tenetur sequi cum et.
              </p>
            </div>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="cursor-pointer hover:shadow-md hover:shadow-slate-300 transition-shadow flex flex-col border-2 max-h-max rounded-lg sm:overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt=""
              className="h-52 object-cover"
            />
            <div className="-m-6 flex justify-start items-center flex-col">
              <img
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                alt=""
                className="w-12 h-12 border-2 shadow-sm  border-white flex justify-center items-center overflow-hidden relative rounded-full object-cover"
              />
            </div>
            <div className="flex h-48 flex-col text-center p-2 mt-2 justify-center items-center">
              <p>Woman holding phone</p>
              <p>
                by <span className="text-blue-500">0x2858b....0FF334</span>
              </p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis tempore sapiente nesciunt velit debitis odit illo
                tenetur sequi cum et.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Container;
