import { useEffect, useState } from "react";
import { Button, Input, LoadingIcon, SearchIcon, useDebounce } from "..";
import axios from "axios";
import { usePage } from "@inertiajs/react";

const Search = ({ type, onSearch, className }) => {
    const user = usePage().props.auth.user;
    const [searchValue, setSearchValue] = useState("");
    const debouncedValue = useDebounce(searchValue, 500);
    const [loading, setLoading] = useState(true);

    const fetchDatas = async () => {
        setLoading(true);
        try {
            if (debouncedValue.trim()) {
                const response = await axios.get(
                    `/${user.role === "Admin" ? "admin" : user.role === "Student" ? "sv" : "gv" }/${type === "Teacher" ? "teachers" : "students"}/search?search=${debouncedValue}`
                );
                onSearch(response.data);
            } else {
                onSearch([]);
            }
        } catch (error) {
            console.error(error);
            onSearch([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, [debouncedValue]);

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    }

    return (
        <div className={`search_container flex items-center ${className}`}>
            <Button 
                small 
                className={"search_btn"} 
                leftIcon={<SearchIcon width="24px" height="24px" className={"search_icon"} />}
            />
            <Input 
                value={searchValue}
                onChange={handleChange}
                placeholder="Tìm kiếm..."
            />
            {loading && <LoadingIcon className={'search_loading-icon'} width="18px" height="18px"/>}
        </div>
    );
}

export default Search;
