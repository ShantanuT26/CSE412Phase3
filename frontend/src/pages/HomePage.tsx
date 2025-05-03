import * as React from "react";
import { ActionButton } from "../components/ActionButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const handleViewApartments = () => {
    // Handle view apartments click
    console.log("View apartments clicked");
    navigate(`/apartments`);
  };

  const handleViewMaintenance = () => {
    // Handle view maintenance requests click
    console.log("View maintenance requests clicked");
    navigate(`/community-requests`);
  };

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/waitlist?preferred_apartment=57')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(err => {
  //       console.error('Error calling backend:', err);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/approved_resident?assigned_apartment=41')
  //     .then(async (res) => {
  //       if (!res.ok) {
  //         const text = await res.text(); // get the HTML error message
  //         throw new Error(`Server error: ${res.status}\n${text}`);
  //       }
  //       return res.json(); // safe to parse JSON
  //     })
  //     .then(data => {
  //       console.log(data); // real data
  //     })
  //     .catch(err => {
  //       console.error('Error calling backend:', err.message);
  //     });
  // }, []);
  
  // useEffect(()=>
  // {
  //   fetch('http://localhost:3001/api/current_resident?apt_number=42')
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.error('Error:', err));

  // })

  


  
  return (
    <main className="bg-[rgb(255, 6, 6)] min-h-screen flex flex-col overflow-hidden items-stretch pt-16 pb-[401px] px-[78px] max-md:pb-[100px] max-md:px-5">
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
