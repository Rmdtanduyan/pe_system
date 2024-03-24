import React, { useState, useEffect } from "react";
import Navbar from '../../components/wholepage/Navbar'
import ItemList from "../../components/Admin/ItemList";
import AddItem from "../../components/Admin/AddItem";
import client from "../../api/client";

const ItemPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [listOfStaff, setListOfStaff] = useState([]);
  const [listofItems, setListofItems] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const staffResponse = await client.get("api/Staffs/Faculties/");
      const itemResponse = await client.get(`item/Itemtag/?search=${searchQuery}`);

      setListOfStaff(staffResponse.data);
      setListofItems(itemResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const updateData = () => {
    fetchData();
  };

  return (
   <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <AddItem updateData={updateData} listofItems={listofItems} />
        <br/>
        
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="text-sm grow" placeholder="Search"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>

        <div className="mt-8">
          <ItemList updateData={updateData} listofItems={listofItems}/>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
