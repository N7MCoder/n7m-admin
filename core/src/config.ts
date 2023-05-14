interface IConfig {
    DEBUG: boolean
    STATIC_PATH?: string
}

const config: IConfig = {
    DEBUG: false,
    STATIC_PATH: ''
}

export { config }