const Prefix = 'cms-server-'

export const getItem = (key: string) => {
    try {
        const itemStr = localStorage.getItem(`${Prefix}${key}`) ?? '';
        return JSON.parse(itemStr);
    } catch (error) {
        console.error(error);
        return null
    }
}

export const setItem = (key: string, value: unknown) => {
    try {
        const valueStr = JSON.stringify(value);
        localStorage.setItem(`${Prefix}${key}`, valueStr);
    } catch (error) {
        console.error(error);
    }
}

export default {
    getItem,
    setItem,
}
