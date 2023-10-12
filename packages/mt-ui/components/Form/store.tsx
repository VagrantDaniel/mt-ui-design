class Store<
    FormData = any,
> {
    private store: Partial<FormData> = {}

    public getStore = () => {
        return this.store
    }

    public setFieldValue = (field: keyof FormData, value: FormData[keyof FormData]) => {
        if (!field) return
        this.store[field] = value
    }

    public getFieldValue = (field: keyof FormData) => {
        return this.store[field]
    }

    public validate = (): boolean => {
        return true
    }

    public resetFields = () => {
        this.store = {}
    }
}

export default Store