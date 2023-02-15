export default ({ config }) => {
    return {
        ...config,
        "name": "Punpay",
        "slug": "Punpay",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/appicon.png",
        extra: {
            eas: {
                projectId: "9de872ed-876f-4cbe-b0ae-d44d65cf4917"
            }
        }
    }
}