
const loadFile = (idFile) => {
    return `http://localhost:8000/api/files/load/${idFile}`
}

export default {
    install: (app, options) => {
        app.config.globalProperties.$loadFile = loadFile
        app.provide('$loadFile', loadFile)
    }
}