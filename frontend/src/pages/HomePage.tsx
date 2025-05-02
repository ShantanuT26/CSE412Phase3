import * as React from "react";
import { ActionButton } from "../components/ActionButton";

export const Welcome: React.FC = () => {
  const handleViewApartments = () => {
    // Handle view apartments click
    console.log("View apartments clicked");
  };

  const handleViewMaintenance = () => {
    // Handle view maintenance requests click
    console.log("View maintenance requests clicked");
  };

  return (
    <main className="bg-[rgba(239,239,239,1)] min-h-screen flex flex-col overflow-hidden items-stretch pt-16 pb-[401px] px-[78px] max-md:pb-[100px] max-md:px-5">
      <section className="max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <ActionButton
              title="View Apartments"
              onClick={handleViewApartments}
            />
          </div>
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <ActionButton
              title="View Community Maintenance Requests"
              onClick={handleViewMaintenance}
            />
          </div>
        </div>
      </section>
      <h1 className="text-black text-[64px] font-light self-center mt-[182px] max-md:text-[40px] max-md:mt-10">
        Welcome!
      </h1>
    </main>
  );
};
export default Welcome;
