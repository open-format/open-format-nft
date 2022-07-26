## Open Format NFT

Open Format NFT is a web application that showcases the tooling we have designed in order for you to build your own platforms without having to worry about the complexity that can come with web3. It can be used as a starting template, a reference or an imediate implementation to get you up and running quickly.

## Libraries and Frameworks

As with most things we have a preference of the following librarires to build our web apps with. The ones with the biggest learning curves are highlighted below but please feel free to add or remove them as you see fit. The only one that is a core dependency is the [Open Format React SDK](https://github.com/simpleweb/open-format/tree/main/sdks/react).

#### Front End Framework

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

#### Styling

- [Tailwind CSS](https://tailwindcss.com/) - Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

#### Forms

- [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.

#### Open Format SDK

- [Open Format](https://github.com/simpleweb/open-format) - Build your own NFT ecosystem. Trustless, permissionless and collaborative.

### Dependencies

- [Node](https://nodejs.org/en/docs/) (version 16 or later)
- [Git](https://nodejs.org/en/docs/)

### Get up and running

> Clone the repo

```
git clone git@github.com:simpleweb/open-format-nft.git
```

> Install dependencies

```
npm install or yarn install
```

> Setup your environment variables

```
cp .env.local.example .env.local
```

| Variable                                | Description                                                                                                                                                                                                     |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_NFT_STORAGE_TOKEN`         | This starter uses nft.storage to interact with IPFS. You can use any IPFS storage provider. [Get an API Key](https://nft.storage/docs/#get-an-api-token)                                                        |
| `NEXT_PUBLIC_FACTORY_ID`                | This is used for filtering the subgraph to only show tokens created in specific factory frontend. This can be any string value, but for uniqueness, we recommend using [UUIDv4](https://www.uuidgenerator.net/) |
| `NEXT_PUBLIC_POLYGON_SCAN`              | Link to the network where you can view your contracts.                                                                                                                                                          |
| `NEXT_PUBLIC_EXAMPLE_NFT_LINK`          | A link to the original creator of our example NFT.                                                                                                                                                              |
| `NEXT_PUBLIC_EXAMPLE_NFT_TOKEN_ADDRESS` | This is the example token address we have created for you to quickly interact with. Feel free to replace this with your own once up and running.                                                                |

> move into the root directory of the Next application

```
npm run dev or yarn dev
```

## Translations

- We have made it quick and easy to add your own copy to all of the current components using the [next-translate](https://www.npmjs.com/package/next-translate) package. The common.json file is where you can add or remove copy in order to make it sound more like you. You can alos remove this package if you wish and just add everything inline.

## Documentation

[Open Format Docs](https://docs.openformat.simpleweb.co.uk/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
