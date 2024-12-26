import { useRef, useState } from "react";
import { Input } from "..";

const PhotoInput = ({ onFileSelect, className }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setErrorMessage('');
            onFileSelect(file);
        } else {
            setImageUrl(null);
            setErrorMessage("Please select a valid image file")
        }
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if(file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setErrorMessage('');
            onFileSelect(file);
        } else {
            setImageUrl(null);
            setErrorMessage("Please select a valid image file")
        }
    }

    const handleClick = () => {
        fileInputRef.current.click();
    }

    return (
        <div 
            className={"input-photo " + className}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleClick}
        >
            <Input 
                ref={fileInputRef}
                type="file"
                name="photo"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <div className={"flex items-center justify-center "}>
                {imageUrl ? (
                    <img src={imageUrl} alt="" className="" />
                    ) : (
                        <>
                            { errorMessage || "Drag to drop or click here to select file" }
                        </>
                    )}
            </div>
        </div>
    );
}

export default PhotoInput;