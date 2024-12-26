import React from "react";
import { Input } from "..";

const PersonalInfo = ({ items, dataEdit }) => {
    return (
        <tr>
            {items.map(({ label, value }, index) => (
                <React.Fragment key={index}>
                    <td className='profile-details_form-lable'>{label}</td>
                    <td>{dataEdit ? 
                        <Input
                            id={dataEdit[index].key}
                            name={dataEdit[index].key}
                            type={dataEdit[index].key === 'dob' || 
                                dataEdit[index].key === 'cccd_date' ||
                                dataEdit[index].key === "date" ? 'date' :
                                dataEdit[index].key === "personal_email" ? 'email' : 'text'
                            }
                            value={value ?? ""}
                            className={"profile-details_input"}
                            autoComplete={dataEdit[index].key}
                            onChange={(e) => dataEdit[index].setData(dataEdit[index].key, e.target.value)}
                        /> : 
                        value }</td>
                </React.Fragment>
            ))}
        </tr>
    );
};

export default PersonalInfo;
