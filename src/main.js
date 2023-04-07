

const inputFile = document.querySelector("#upload-file");
const fileStatus = document.querySelector("#file-box .status");

const dropAreaBox = document.querySelector("#upload-box");

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



/**
handleWithFileStatus - Handles the status of the file upload
@param {string} status - The status of the file upload, either "success" or "error"
*/

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


/**
handleWithFileProperties - Handles the file input and upload process
@param {boolean} isAborted - Flag to indicate if the upload has been aborted
*/

const handleWithFileProperties = (isAborted) => {

    inputFile.addEventListener("change", () => {
        loadFileSelected(inputFile);
    });

    dropAreaBox.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropAreaBox.classList.add("dropFile");
    });

    dropAreaBox.addEventListener("dragleave", (event) => {
        event.preventDefault();
        dropAreaBox.classList.remove("dropFile");
    });

    dropAreaBox.addEventListener("drop", (event) => {
        event.preventDefault();
        loadFileSelected(event);
    });


/**
loadFileSelected - Loads the selected file and starts the upload process
@param {Event} fileEvent - The file event containing the selected file
*/

    const loadFileSelected = (fileEvent) => {

        let file;
        if (fileEvent.files && fileEvent.files.length > 0) {
            file = fileEvent.files[0];

        } else if (fileEvent.dataTransfer && fileEvent.dataTransfer.files.length > 0) {
            file = fileEvent.dataTransfer.files[0];
        }

        if (!file) {
            alert("Nenhum arquivo selecionado");
            return;
        }

        const fileSize = Math.round((file.size / 1024));

        fileStatus.style.display = "flex";
        showFileName(file.name)
        showfileSize(fileSize);

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/', true);

        xhr.upload.onprogress = (event) => {

            const loaded = event.loaded;
            const percent = Math.round((loaded / file.size) * 100);

            showfileSizeLoaded(loaded);
            showProgressBar(percent)
            showProgressInPercent(percent);

        };

        xhr.send(formData);


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
    }

}
handleWithFileProperties();








