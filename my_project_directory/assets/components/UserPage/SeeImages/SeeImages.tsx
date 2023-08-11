import React, {useEffect, useState} from "react";
import './SeeImages.css';
import UserNav from "../../common/Navbar/UserNav/UserNav";

interface Image {
    id: number;
    name: string;
}

function SeeImages() {
    const [images, setImages] = useState<Image[]>([]);
    const userSet = sessionStorage.getItem('user');
    const user = userSet ? JSON.parse(userSet) : null;
    const userId = user.id;

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/see-user-image/${userId}`)
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.error('Error fetching images:', error));
    }, [userId]);

    return (
        <>
            <UserNav/>
            <div className="image-body">
                <h1>Images</h1>
                <div className="image-container">
                    {images.map(image => (
                        <img
                            key={image.id}
                            src={`/image/${image.name}`}
                            alt={`Image ${image.id}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default SeeImages;