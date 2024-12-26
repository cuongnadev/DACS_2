import { Inertia } from "@inertiajs/inertia";
import { Button, DropdownIcon, PlusIcon, Search } from "..";
import React, { useState } from "react";
import { Dropdown } from "../dropdown";
import axios from "axios";
import { usePage } from "@inertiajs/react";

    const Toolbar = ({ role, pageType, onSearch, onSorted, initialYears, initialSelectedYear }) => {
        const user = usePage().props.auth.user;
        const [seleactedYear, setseleactedYear] = useState(initialSelectedYear);
        const handleYearChange = async (e, year) => {
            e.preventDefault();
            try {
                const response = await axios.get(`/${user.role === "Admin" ? "admin" : user.role === "Student" ? "sv" : "gv" }/students/sort?year=${year}`);
                onSorted(response.data.students, year);
                setseleactedYear(response.data.selectedYear);
            } catch (error) {
                console.log(error);
            }
        }

        return (
            <div className="flex items-center justify-between">
                <Search className="toolbar_search" type={pageType} onSearch={onSearch}/>
                <div className="flex items-center justify-center gap-4">
                    <React.Fragment>
                        {pageType === "Student" && 
                        <Dropdown className={"toolbar_sorted-dropdown"}>
                            <Dropdown.Trigger className="toolbar_sorted-trigger">
                                <Button 
                                    outline 
                                    rightIcon={<DropdownIcon width="20px" height="20px"/>} 
                                    className={"toolbar_btn flex items-center gap-2"}
                                >
                                    Khóa {seleactedYear}
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content className="toolbar_sorted-content">
                                {initialYears.map((year) => (
                                    <Dropdown.Link 
                                        key={year}
                                        className="toolbar_sorted-link"
                                        onClick={(e) => handleYearChange(e, year)}
                                    >
                                        Khóa {year}
                                    </Dropdown.Link>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                       }
    
                        {role === 'Admin' &&
                        <Button 
                            filled 
                            leftIcon={<PlusIcon width="12px" height="12px"/>} 
                            className={" toolbar_btn flex items-center gap-2"}
                            onClick={pageType === "Teacher" ? 
                                () => Inertia.visit(route("admin.teachers.add")) : 
                                () => Inertia.visit(route("admin.students.add"))}
                        >
                            Thêm {pageType === "Student" ? "Sinh Viên" : "Giáo Viên"}
                        </Button>}
                    </React.Fragment>
                </div>
            </div>
        );
    }

    export default Toolbar;