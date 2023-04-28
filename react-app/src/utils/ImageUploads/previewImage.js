    const handlePreviewImage = async (e) => {
        const file = e.target.files[0];
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                resolve(fileReader.result);
                };

            fileReader.onerror = (error) => {
                reject(error);
            };
            });
        };
        const base64 = await convertToBase64(file);
        return base64;
    };


  export default handlePreviewImage
