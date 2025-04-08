import Sidebar from "./Sidebar";

export interface PageWrapperProps {
  children: React.ReactNode;
}

/**
 * The PageWrapper component is the base layout for all the pages in the application.
 * It includes the Sidebar for navegation and the main content area.
 * @param children
 */
const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-row h-screen">
        <Sidebar />
        <div
          className="bg-base-200 h-screen w-full 
        flex items-center content-center py-16 px-32"
        >
          <div
            className="bg-base-100 overflow-auto shadow-xl 
          w-full h-full rounded-xl flex flex-col"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageWrapper;
