type RawTransaction = {
  id: string;
  from: string;
  to: string;
  timestamp: string;
  token: {
    saleData: {
      salePrice: string;
    };
  };
};

type Transaction = {
  event: string;
  from: string;
  to: string;
  date: string;
  price: string;
};

type Property = {
  key: string;
  value: string;
};

type Category = {
  name: string;
  href: string;
};

type Resource = {
  title: string;
  href: string;
  category: Category;
  imageUrl: string;
  alt: string;
  description: string;
};

type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

type Action = {
  title: string;
  icon: HeroIcon;
  iconForeground: string;
  iconBackground: string;
  description: string;
};
