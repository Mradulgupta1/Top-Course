import React, { useState, useEffect } from "react";
import { apiUrl, filterData} from "./data";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import Cards from "./components/Cards";
import Card from "./components/Card";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

function App(){

    const[courses, setCourses] = useState([]);
    const[loading,setLoading] = useState(true);
    const[category,setCategory] = useState(filterData[0].title);

    async function fetchData() {
        setLoading(true);
        try{
            let res = await fetch(apiUrl);
            let output = await res.json();
            setCourses(output.data);
        }
        catch(error){
            toast.error("Daya Kuch to gadbad hai");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    },[]);

    // fetchData();

    return(
        <div className="flex flex-col min-h-screen bg-bgDark2">
            <div>
                <Navbar></Navbar>
            </div>
            <div className="bg-bgDark2">
                <div>
                    <Filters category={category} setCategory={setCategory} filterData = {filterData}></Filters>
                </div>
                <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
                    {
                        loading? (<Spinner></Spinner>) : (<Cards courses = {courses} category={category}></Cards>)
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
