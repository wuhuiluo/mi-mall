/* storage封装 */
const STORAGE_KEY = 'mi-mall';
export default {
    // 存储值
    setItem(key, value, parentKey) {
        if (parentKey) {
            let parentVal = this.getItem(parentKey)
            parentVal[key] = value
            // 递归存储
            this.setItem(parentKey, parentVal)
        } else {
            let val = this.getStorage()
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
        }
    },
    // 获取值
    getItem(key, parentKey) {
        if (parentKey) {
            let parentVal = this.getItem(parentKey)
            if (parentVal) {
                return parentVal[key]
            }
        }
        // 获取Stroage中一级Key
        return this.getStorage()[key];
    },
    // 获取所有值
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    },
    // 清除
    clear(key, parentKey) {
        let val = this.getStorage()
        if (parentKey) {
            if (!val[parentKey]) {
                return
            }
            delete val[parentKey][key]
        } else {
            delete val[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
}


