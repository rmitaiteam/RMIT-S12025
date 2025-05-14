## AdLab | An Ad Generation Platform
Built by RMIT Data Science and AI students, batch of 2024. 

This platform was built using Next.js, Shadcn/ui, NextUI and TailwindCSS. It contains the following functionalities:
1. Dashboard with quick links and an at-a-glance view of the 3 most recently generated ads.
2. Keywords can be accessed from *every* RMIT Google Ads sub-account. All you need to do is enter the campaign name and account name.
3. Competitor and Live Ads' statistics are beautifully visualised using Shadcn Chart components.
4. Complete control over scraping: User can add or remove keywords that need to be scraped. Additionally, users can also see which keywords fetched ads in the most recent scrape job.
5. Ad Generation: Users will be  able to view all the competitor ads that were used to generate a new ad. They can also rate the generated ads and opt for saving it for using the ad later.
6. Admin Settings: Admin Level users will be able to generate invite links for new users, remove existing users along with providing or revoking admin level privileges from users.
7. Profile Settings: Users can update their display names and passwords from within the platform. Password updation does not require user to logout and follow the 'Forgot Password' route.
8. Beatiful loading states everywhere for the best possible user experience.

If you wish to build on top of this, clone the repo and create a .env.local file. You will need to use the credentials stored in AWS Amplify secrets. Run `npm install` to install all dependencies and then in your terminal, enter `npm run dev` which should start serving the application on localhost:3000.

