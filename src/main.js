

const inputFile = document.querySelector("#upload-file");
const fileStatus = document.querySelector("#file-box .status");

const fileName = document.querySelector(".file .name");
const fileSize = document.querySelector(".file .size span:last-child");
const fileSizeLoaded = document.querySelector(".file .size span:first-child");

const progressBar = document.querySelector(".progress");
const progressInPercent = document.querySelector(".percent");

const buttonIcon = document.querySelector(".icon i");



const showFileName = (name) => {
    fileName.textContent = name;
}
const showfileSize = (size) => {
    fileSize.textContent = `${size} kb`
}
const showfileSizeLoaded = (progress) => {
    fileSizeLoaded.textContent = `${progress} kb / `;
}
const showProgressBar = (progress) => {
    progressBar.style.width = `${progress}%`;
}
const showProgressInPercent = (progress) => {
    progressInPercent.textContent = `${progress}%`;
}

const handleWithFileStatus = (status) => {

    if (status === "sucess") {
        fileStatus.classList.remove("loading");
        fileStatus.classList.add("success");
        buttonIcon.classList.remove("ph-x");
    }

    if (status === "error") {
        fileStatus.classList.remove("loading");
        fileStatus.classList.add("error");
        buttonIcon.classList.remove("ph-x");
        buttonIcon.classList.add("ph-arrow-counter-clockwise");
    }
}


const handleWithFileProperties = (isAborted) => {

    inputFile.addEventListener("change", () => {

        if (inputFile.files.length > 0) {

            const file = inputFile.files[0];

            const fileSize = Math.round((file.size / 1024));

            fileStatus.style.display = "flex";
            showFileName(file.name)
            showfileSize(fileSize);

            const formData = new FormData();
            formData.append('file', file);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);

            xhr.upload.onprogress = (event) => {

                const loaded = event.loaded;
                const percent = Math.round((loaded / file.size) * 100);

                showfileSizeLoaded(loaded);
                showProgressBar(percent)
                showProgressInPercent(percent);


            };
            xhr.send(formData);
        
            buttonIcon.addEventListener("click", (e) => {
                e.preventDefault();

                if (!isAborted) {
                    if (xhr.readyState !== xhr.DONE) {
                        isAborted = true;
                        xhr.abort();
                        handleWithFileStatus("error");
                        console.log(xhr.responseText);
                    }
                }  
                else {
                    const uploadForm = document.querySelector("#uploadForm");                    
                    isAborted = false;        
                    uploadForm.reset();
                    location.reload();
                }
            });

            xhr.onreadystatechange = () => {

                try {

                    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                        handleWithFileStatus("sucess");
                        console.log("sucess status " + xhr.status);
                    }

                } catch (err) {
                    handleWithFileStatus("error");
                    xhr.abort();
                    console.log("Erro " + xhr.status + ": " + xhr.statusText);
                }

            }
        }
    });

}
handleWithFileProperties();








