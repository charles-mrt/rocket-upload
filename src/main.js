

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

        }

    });

}

handleWithFileProperties();



const renderFileUpLoadStatus = (fileName, fileLoaded, fileSize, percentLoaded, progressBar) => {

    let status = "file-uploading";
    let barStatus = "uploding";
    let progressLoaded = "uploding";   
    let iconName = "ph-thin ph-x";
    let iconStatus = "cancel";

    if (percentLoaded === 100) {
        status = "file-success";
        barStatus = "sucess";
        progressLoaded = "sucess";   
        iconStatus ="";
        iconName = "";        
    }

    if (percentLoaded === "error") {
        status = "file-error";
        barStatus = "error";
        progressLoaded = "error";
        iconStatus = "retry";
        iconName = "ph-thin ph-arrow-counter-clockwise";
    }

    const fileStatusBox = document.querySelector("#file-box");

    const renderStatusBox = `
        
        <div class="file-icon">
            <i class="ph-fill ph-file"></i>
        </div>

        <div class="file-status">
            <strong class="file-name">
                ${fileName}
            </strong>

            <div class="file-size">
                <span>${fileLoaded}</span> / 
                <span>${fileSize}</span>
            </div>

            <div class="progress-bar">

                <div class="bar ${barStatus}">
                    <div style="width:${progressBar}%"></div>
                </div>

                <span class="progress ${progressLoaded}">
                    ${percentLoaded}%
                </span>

            </div>

        </div>

        <span class="${iconStatus} icon">
            <i class="${iconName}"></i>
        </span>
        
    `;
    return fileStatusBox.innerHTML = `<div class="status ${status}">${renderStatusBox}</div>`;
}






