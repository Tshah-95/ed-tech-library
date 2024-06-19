This project was built for [this showcase](https://app.10foldhiring.com/showcase/1) by [Tejas Shah](https://www.linkedin.com/in/tejasshah95) and deployed [here](https://ed-tech-library.vercel.app/) on vercel. If you have any questions feel free to email me at shaht5495@gmail.com

I used a slew of packages. Primary ones for styling and animations were [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), and [RadixUI](https://www.radix-ui.com/) (for the modal), [Heroicons](https://heroicons.com/) + [Radix Icons](https://www.radix-ui.com/icons) for my iconography, and [SWR](https://swr.vercel.app/) for front-end requests.

I pretended that some fictional edtech company was essentially building some kind of open source public tool for sharing educational resources from top universities to their students and abroad. Rather than hiding the functionality behind a dashboard, I decided to combine the marketing/branding pages and the video repository into a single page as I thought it accomplished that goal a bit more on-brand than segmenting the experiences would have.
![Splash](/public/splash_top.png)

I added search and upload right above the repository itself as that felt natural.
![Repository](/public/video_repository.png)

The search uses a bit of custom levenstein-distance code that's slightly better than raw matching and I debounced the filtration so it's a bit less jumpy.

The upload experience is a really bare-bones modal, as is the comment section (one of the trade-offs for a single-page approach). Each video is represented in a card with it's title, who uploaded it, and the description. The link to the video and comments are buttons in the top corner. I did some mild server side validation, but didn't bother validating the form inputs.

It should be fully responsive with primary breakpoints for mobile, tablet, and desktop. I'm not adding screenshots as making them not span the entire width of the readme seems to be non-menial, but if you just go [here](https://ed-tech-library.vercel.app/) on any mobile device you can see for yourself. Or, swap your browser to mobile view in dev tools

I recorded a loom to explain what I did and some improvements I would make if this were an actual system being built for production.

## Getting Started

After you clone the repository you'll want to install the packages with your preferred package manager such as pnpm

```bash
pnpm install
```

Then you can start the development server with

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

The heavy lifting is all done in app/page.tsx which hosts the primary experience in a client component. I made the background black server side as the rolling bg-image loads so it's a bit less jarring

Secondary components are stored in app/components

The frontend api calls needed to be wrapped by next api routes since the [`API from the problem`](https://take-home-assessment-423502.uc.r.appspot.com/docs#/) doesn't seem to have a permissive CORS policy. They can be found in app/api

I also used SWR so that I could call mutations on the 2 post cases (video + comment) and have the UX immediately update with the new entry from the server.

I had some utlity files in app/lib. Notably there's a constants file there that can be used to change the USER_ID. You can also go directly to app/components/comment-modal.tsx to adjust the user_id that goes out in the request if you're running locally and want to post a comment as a different user for testing. Since there's only one backend environment, changes in dev obviously persist in prod
