/* eslint-disable react/no-unescaped-entities */
"use client";
import { Divider } from "@nextui-org/divider";
import Image from "next/image";
export default function Help() {
  return (
    <div>
      <div className="bg-stone-800">
        <div className="fixed flex justify-between items-center py-4 ml-5 bg-black z-40">
          <a href="/">
            <Image
              src="/AdLabLogo.png"
              alt="App Logo"
              width={120}
              height={50}
            />
          </a>
        </div>
        <div className="fixed top-20 left-5 text-sm p-4 rounded-md">
          <p className="text-neutral-300">On this page</p>
          <ul className="">
            <a href="#introduction">
              <li className="text-neutral-300 hover:text-blue-400 text-sm indent-4 mt-2">
                Introduction
              </li>
            </a>
            <a href="#main-features">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Main Features
              </li>
            </a>
            <a href="#dashboard">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Dashboard Functionalities
              </li>
            </a>
            <a href="#analytics">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Analytics Functionalities
              </li>
            </a>
            <a href="#generate">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Generate Ads Functionality
              </li>
            </a>
            <a href="#profile-settings">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Profile Settings
              </li>
            </a>
            <a href="#admin-settings">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Admin Settings
              </li>
            </a>
            <a href="#dev-docs">
              <li className="text-neutral-300 hover:text-blue-400 text-sm indent-4 mt-2">
                Developer Documentaion
              </li>
            </a>
            <a href="#architecture">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Architecture
              </li>
            </a>
            <a href="#architecture">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Vector Retrieval
              </li>
            </a>
            <a href="#architecture">
              <li className="text-neutral-300 hover:text-blue-400 text-xs indent-6 mt-2">
                Postgres and PGVector
              </li>
            </a>
            <a href="#resources">
              <li className="text-neutral-300 hover:text-blue-400 text-sm indent-4 mt-2">
                Resources
              </li>
            </a>
          </ul>
        </div>
      </div>
      <div className="container w-full max-w-4xl mx-auto px-4 py-12 dark:bg-background dark:text-foreground">
        <div id="introduction">
          <h1 className="text-3xl font-bold mt-5 mb-5 font-medium tracking-tight">
            Introduction
          </h1>
        </div>
        <p className="text-neutral-300">
          AdLab is an application built for analysing competitor ads and
          generating new ads using said competitor ads and GPT4o. The
          application allows users to input keywords and generate ads based on
          the keywords and competitor ads.
        </p>
        <Divider className="my-5" />
        <div id="main-features">
          <h1 className="text-xl font-bold mt-5 mb-5 font-medium tracking-tight">
            Main Features
          </h1>
          <p className="text-neutral-300">
            You will find the following features in the application:
          </p>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 font-normal">Feature</th>
                <th className="px-4 py-2 font-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  <a href="#dashboard" className="text-blue-500">
                    <strong>Dashboard</strong>
                  </a>
                </td>
                <td className="border px-4 py-2 text-neutral-300">
                  A central place to view keywords used in your campaigns, and
                  gain quick access to the other features.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  <a href="#analytics" className="text-blue-500 ">
                    <strong>Analytics</strong>
                  </a>
                </td>
                <td className="border px-4 py-2 text-neutral-300">
                  Detailed insights and analytics on competitor ad campaigns,
                  with beautiful visualisations and drill down views.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  <a href="#generate" className="text-blue-500 ">
                    <strong>Generate</strong>
                  </a>
                </td>
                <td className="border px-4 py-2 text-neutral-300">
                  Create new ads using keywords and competitor ads with the help
                  of GPT4o.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  <a href="#recent-ads" className="text-blue-500 ">
                    <strong>Recent Ads</strong>
                  </a>
                </td>
                <td className="border px-4 py-2 text-neutral-300">
                  A list of the most recently created ads for quick access and
                  review. You can click on the ad to view the full details of
                  the ad.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Divider className="my-5" />
        <div id="dashboard">
          <h1 className="text-xl font-bold mt-5 mb-5 font-medium tracking-tight">
            Dashboard Functionalities
          </h1>
          <div className="flex justify-center mb-4">
            <Image
              src={"/DashUI.png"}
              width={800}
              height={400}
              alt="Dashboard"
            />
          </div>
          <p className="text-neutral-300 mt-4">
            The dashboard is the central hub of the application where you can
            manage and monitor your ad campaigns. Here are the key
            functionalities:
          </p>
          <ul className="list-disc list-inside text-neutral-300">
            <li>
              <strong>Keyword Overview:</strong> View a summary of the keywords
              you are targeting in your campaigns.
            </li>
            <li>
              <strong>Quick Access:</strong> Easily navigate to other features
              like Analytics, Ad Generation, and Recently Generated Ads from the
              dashboard.
            </li>
          </ul>
          <div className="flex justify-center mt-5 mb-4">
            <Image
              src={"/KeywordsUI.png"}
              width={600}
              height={300}
              alt="Dashboard"
            />
          </div>
          <p className="text-neutral-300">
            By clicking on the keywords option, you will see a text input field
            and a dropdown. The dropdown allows you to select a sub-account in
            RMIT Google Ads Master account. Type in a campaign name, select a
            sub-account and click 'Fetch'. The app will fetch the keywords from
            the campaign and display them below the field. This will take upto
            30 seconds unfortunately as the Google Ads API performs an
            authorisation check for every request. If you do not see any
            keywords, do not worry, click fetch again and you will see the
            keywords appear.
          </p>
        </div>
        <Divider className="my-5" />
        <div id="analytics">
          <h1 className="text-xl font-bold mt-5 mb-5 font-medium tracking-tight">
            Analytics Functionalities
          </h1>
          <div className="grid grid-col justify-center mt-5 mb-4">
            <Image
              src={"/MainChart.png"}
              width={600}
              height={300}
              alt="Dashboard"
            />
            <Image
              src={"/titleTable.png"}
              width={600}
              height={300}
              alt="Dashboard"
            />
            <Image
              src={"/DescTable.png"}
              width={600}
              height={300}
              alt="Dashboard"
              className="mt-2"
            />
          </div>
          <p className="text-neutral-300">
            The analytics section provides detailed insights into competitor ad
            campaigns. Do note that there may be instances where Google does not
            return any ads for a keyword, in which case, you may not see much
            information. Keep an eye on the Keyword Actions page to track which
            keywords returned ads during the previous scrape job. Anyway, here
            are the key functionalities:
            <br />
          </p>
          <ul className="list-disc list-inside text-neutral-300">
            <li>
              <strong>Competitor Analytics:</strong> Enter a keyword and a
              timeframe to view visualizations (and print the analysis as well).
              This includes:
              <ul className="list-disc list-inside ml-5 text-neutral-300">
                <li>A bar chart showing ads from the top 5 competitors.</li>
                <li>
                  Two radar charts showing word frequencies in titles and
                  descriptions (with the data in the radar chart being tabulated
                  just below the charts)
                </li>
              </ul>
            </li>
            <li>
              <strong>Top Ads:</strong> Scroll down to view some of the top ads
              from competitors for the given keyword and timeframe.
            </li>
            <li>
              <strong>Navigation:</strong> Navigate to Competitor Analytics
              directly via the dashboard quick link or use the navbar on top to
              access Competitor Analytics or Live Ad Analytics.
            </li>
          </ul>
        </div>
        <Divider className="my-5" />
        <div id="generate">
          <h1 className="text-xl font-bold mt-5 mb-5 font-medium tracking-tight">
            Generate Ads Functionality
          </h1>

          <div className="grid grid-col justify-center mt-5 mb-4">
            <Image
              src={"/GenAd.png"}
              width={600}
              height={300}
              alt="Dashboard"
            />
          </div>
          <p className="text-neutral-300">
            The Generate Ads section allows you to create new ads using keywords
            and competitor ads with the help of GPT4o. Here are the key
            functionalities:
          </p>
          <ul className="list-disc list-inside text-neutral-300">
            <li>
              <strong>Keyword Input:</strong> Enter a keyword to start
              generating ads. The app will analyze competitor ads based on the
              keyword.
            </li>
            <li>
              <strong>Ad Quality Levels:</strong> The generated ads will be
              categorized into three quality levels:
              <ul className="list-disc list-inside ml-5 text-neutral-300">
                <li>
                  <strong>Best:</strong> High-quality ads that are most likely
                  to perform well.
                </li>
                <li>
                  <strong>Good:</strong> Average-quality ads that may perform
                  decently.
                </li>
                <li>
                  <strong>Low:</strong> Low-quality ads that are less likely to
                  perform well.
                </li>
              </ul>
            </li>
            <li>
              <strong>Competitor Ads Reference:</strong> The app will provide a
              list of all the competitor ads it referred to while generating the
              new ads. If you are satisfied with the generated ads, you can save
              it by clicking the 'Approve' button.
            </li>
            <li>
              <strong>GPT Analysis:</strong> Read GPT's analysis of the
              competitor ads and understand why the generated ads might be
              better. This includes:
              <ul className="list-disc list-inside ml-5 text-neutral-300">
                <li>
                  An explanation of the strengths and weaknesses of the
                  competitor ads.
                </li>
                <li>
                  Insights into how the generated ads address the weaknesses and
                  leverage the strengths.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Divider className="my-5" />
        <div id="profile-settings">
          <h1 className="text-xl font-bold mt-5 mb-5 font-medium tracking-tight">
            Profile Settings
          </h1>
          <div className="flex justify-center mt-4">
            <Image src={"/profile.png"} width={600} height={400} alt="Logo" />
          </div>
          <p className="text-neutral-300">
            The profile settings page allows you to update your profile
            information, including your preferred username and password. If you
            would like to change your email, contact an admin.
          </p>
        </div>
        <Divider className="my-5" />
        <div id="admin-settings">
          <h1 className="text-xl font-bold mt-5 mb-5 font-medium tracking-tight">
            Admin Settings
          </h1>
          <div className="grid grid-col justify-center mt-5 mb-4">
            <Image
              src={"/admin.png"}
              width={600}
              height={300}
              alt="Dashboard"
            />
          </div>
          <p className="text-neutral-300">
            Admin settings allow you to manage user roles and permissions as
            well as add or remove users. To add a new user, you must enter their
            email which will generate an invite link. Click on the link to copy
            it and share it with the user. The user can then click on the link
            to create an account and access the platform. Similarly, enter the
            user's email to remove them from the platform, make them an admin,
            or revoke their admin status.
          </p>
          <p className="text-neutral-300 mt-4">
            Only admins can access the admin settings page. If you are not an
            admin, you will not see the admin settings option in the navbar on
            top. Manually changing the URL to '/admin' will not work either. If
            you are not an admin, you will be redirected to the dashboard. If
            you do want to make changes to user access, please contact a user
            who has admin access.
          </p>
        </div>
        <Divider className="my-5" />
        <div id="dev-docs">
          <h1 className="text-2xl font-bold mt-5 mb-5 font-medium tracking-tight">
            Developer Documentation
          </h1>
          <p className="text-neutral-300">
            The application is built using Next.js, Tailwind CSS, ShadCN UI, and
            NextUI. Here are some key points to keep in mind:
          </p>
          <ul className="text-neutral-300">
            <li className="list-disc">
              The application is fully serverless, there are 6 lambda functions
              that power this application.
            </li>
            <li className="list-disc">
              The code you see in the repo may not be the deployed version.
              Please pull the docker image from the comp-ads and google-ads
              repositories.
            </li>
            <li className="list-disc">
              Please use the google-ads docker image to replicate/build upon
              functionalities that involve the Google Ads API. The REST
              interface is not very intuitive and require a lot of
              authentication logic.
            </li>
          </ul>
          <div id="architecture">
            <h1 className="text-2xl mt-4 font-medium">Architecture</h1>
          </div>
          <div className="flex justify-center mt-4">
            <Image src={"/arch.svg"} width={600} height={400} alt="Logo" />
          </div>
          <p className="text-neutral-300 mt-4">
            Refer to the final report for the details of how this works. For the
            actual working lambda code, please pull the container image from the
            comp-ads repository in ECR.
          </p>
          <h1 className="text-xl font-medium mt-4 mb-2">Vector Retrieval</h1>
          <p className="text-neutral-300">
            Vector retrieval is a process used to find similar items in a
            dataset by comparing their vector representations. In the context of
            this application, embeddings generated by the OpenAI API are used to
            represent competitor ads' titles as vectors. These vectors are then
            compared using similarity measures (cosine similarity) to find ads
            that are most similar to the input keywords. This allows the
            application to provide relevant competitor ads and generate new ads
            based on the most similar existing ads.
          </p>
          <h1 className="text-xl font-medium mt-4 mb-2">
            Postgres and PGVector
          </h1>
          <p className="text-neutral-300">
            Postgres is a powerful, open-source relational database that is used
            to store and manage the application's data. PGVector is an extension
            for Postgres that adds support for vector data types and similarity
            search. By using PGVector, the application can efficiently store and
            query vector embeddings generated by the OpenAI API. This enables
            fast and accurate vector-based search, allowing the application to
            quickly find and retrieve relevant competitor ads based on their
            vector representations.
          </p>
          <div id="resources">
            <h1 className="text-2xl font-bold mt-5 mb-5 font-medium tracking-tight">
              Resources
            </h1>
          </div>
          <p className="text-neutral-300 text-xl mb-2 font-medium">
            💿 Database
          </p>
          <ul className="list-inside text-blue-400 ml-5">
            <li>
              <a
                href="https://www.timescale.com/blog/postgresql-as-a-vector-database-create-store-and-query-openai-embeddings-with-pgvector/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Timescale
              </a>
            </li>
            <li>
              <a
                href="https://cookbook.openai.com/examples/vector_databases/hologres/getting_started_with_hologres_and_openai"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenAI Cookbook
              </a>
            </li>
            <li>
              <a
                href="https://supabase.com/blog/openai-embeddings-postgres-vector"
                target="_blank"
                rel="noopener noreferrer"
              >
                Supabase
              </a>
            </li>
          </ul>
          <p className="text-neutral-300 text-xl mt-2 mb-2 font-medium">
            🧑🏻‍💻 Front-End
          </p>
          <ul className="list-inside text-blue-400 ml-5">
            <li>
              <a
                href="https://sdk.vercel.ai/docs/guides/rag-chatbot-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel SDK
              </a>
            </li>
          </ul>
          <p className="text-neutral-300 text-xl mt-2 mb-2 font-medium">
            🧑🏻‍💻 Back-End
          </p>
          <ul className="list-inside text-blue-400 ml-5">
            <li>
              <a
                href="https://www.datacamp.com/tutorial/open-ai-function-calling-tutorial"
                target="_blank"
                rel="noopener noreferrer"
              >
                DataCamp
              </a>
            </li>
            <li>
              <a
                href="https://stackoverflow.com/questions/31714788/can-an-aws-lambda-function-call-another"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stack Overflow
              </a>
            </li>
            <li>
              <a
                href="https://developers.google.com/google-ads/api/docs/keyword-planning/generate-historical-metrics#python"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads API
              </a>
            </li>
          </ul>
          <p className="text-neutral-300 text-xl mt-2 mb-2 font-medium">
            🧐 Evaluation
          </p>
          <ul className="list-inside text-blue-400 ml-5">
            <li>
              <a
                href="https://www.mongodb.com/developer/products/atlas/evaluate-llm-applications-rag/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MongoDB
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
