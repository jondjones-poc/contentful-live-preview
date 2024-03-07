import 'tailwindcss/tailwind.css'
import "@contentful/live-preview/style.css";
import { draftMode } from 'next/headers';
import { ContentfulPreviewProvider } from '@/components/contentful-preview-provider';

export const metadata = {
  title: 'JonDJones Live Preview Example'
};

export default function RootLayout({children}) {

  const { isEnabled } = draftMode();
  console.log('isEnabled', isEnabled);

  const linkClassname =
  "whitespace-nowrap mr-2 py-2 px-4 cursor-pointer rounded-xl bg-yellow-300 hover:bg-yellow-500";

   return (
    <html lang="en">
      <body>
        <div className="bg-blue-200 w-full">
          <div className="flex flex-row px-4 md:px-20 lg:px-40 py-10">
            <div className="float-left w-full font-bold text-xl">
              <a href="/">Contentful Live Preview Demo</a>
            </div>
            <div className="float-right flex flex-row items-center">
              <a href="/"><span className={linkClassname}> Home </span></a>
            </div>
          </div>
        </div>

         <ContentfulPreviewProvider
            locale="en-US"
            enableInspectorMode={isEnabled}
            enableLiveUpdates={isEnabled}
            debug={isEnabled} >
            {children}
          </ContentfulPreviewProvider>

        <div>
        <div className="bg-blue-200 w-full py-20 text-center">
        </div>
        </div>
      </body>
    </html>
  );
};