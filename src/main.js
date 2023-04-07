

const inputFile = document.querySelector("#upload-file");

const handleWithFileProperties = () => {

    inputFile.addEventListener("change", () => {

        if (inputFile.files.length > 0) {

            const file = inputFile.files[0];
            const fileSize = Math.round((file.size / 1024));

            // Configura a barra de progresso com o tamanho do arquivo
            const max = file.size;

            // Cria uma instância de FormData e adiciona o arquivo
            const formData = new FormData();
            formData.append('file', file);

            // Cria uma instância de XMLHttpRequest e envia o arquivo
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);

            xhr.upload.onprogress = (event) => {

                // Atualiza o valor da barra de progresso com o percentual de carregamento
                const loaded = event.loaded;
                const percent = Math.round((loaded / max) * 100);

                renderFileUpLoadStatus(file.name, loaded, fileSize, percent, percent);
            };
            xhr.send(formData);

            const AbortUpload = () => {
                const AbortIcon = document.querySelector(".icon");
                AbortIcon.addEventListener("click", () => {
                    console.log("testessss")
                });
                console.log("teste")
            }
           // setTimeout(AbortUpload, 500);


        }

    });

}

handleWithFileProperties();






const renderFileUpLoadStatus = (fileName, fileLoaded, fileSize, percentLoaded, progressBar) => {

    let status = "uploading";
    let iconName = "ph-thin ph-x";
    
    if (percentLoaded === 100) {
        status = "success";
        iconName = "";
    }

    if (percentLoaded === "error") {
        status = "error";
        iconName = "ph-thin ph-arrow-counter-clockwise";
    }


    const renderStatusBox = `
        
        <div class="file-icon">
            <i class="ph-fill ph-file"></i>
        </div>

        <div class="file">
            <strong class="name">
                ${fileName}
            </strong>

            <div class="size">
                <span>${fileLoaded} kb</span> / 
                <span>${fileSize} kb</span>
            </div>

            <div class="progress-bar">

                <div class="bar-size">
                    <div class="progress" style="width:${progressBar}%"></div>
                </div>

                <span class="percent">
                    ${percentLoaded}%
                </span>

            </div>

        </div>

        <span class="icon">
            <i class="${iconName}"></i>
        </span>
        
    `;

    const fileStatusBox = document.querySelector("#file-box");

    return fileStatusBox.innerHTML = `<div class="status ${status}">${renderStatusBox}</div>`;
}






