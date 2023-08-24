import axios, {type AxiosRequestConfig} from "axios";
import { loadConfigYaml } from "./navite";
import is from "electron-is";
import { ipcRenderer } from "electron";
import { shutdownServer } from "./api";


let port:any = 0
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

if(!is.dev()){
    while(true){
        port = loadConfigYaml()
        if(port ===0){
            sleep(2000); // 等待2秒
            port = loadConfigYaml()
        }else{
            break
        }
    }
}
// axios.defaults.baseURL = "http://127.0.0.1:"+addr;

const baseURL = is.dev() ? "http://127.0.0.1:28888" : "http://127.0.0.1:"+port;
axios.defaults.baseURL = baseURL
console.log(axios.defaults.baseURL)
axios.defaults.timeout = 20 * 1000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;
axios.defaults.withCredentials = true
axios.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {

        config.params = {
            ...config.params,
            // t: Date.now(),
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);
ipcRenderer.on("shutdownServer", (event, arg) => {
    console.log('[app] shutdownServer')
    shutdownServer()
});
interface ResType<T> {
    code: number;
    data?: T;
    msg: string;
    err?: string;
}

interface Http {
    get<T>(url: string, params?: unknown): Promise<T>;

    post<T>(url: string, params?: unknown): Promise<T>;
    post2<T>(url: string, data?: unknown): Promise<T>;

    upload<T>(url: string, params: unknown): Promise<T>;

    put<T>(url: string, params: unknown): Promise<T>;

    delete<T>(url: string, params: unknown): Promise<T>;

    download(url: string): void;
}

const http: Http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, {params})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    },

    post(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, JSON.stringify(params))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    },
    post2(url, data) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, data)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    },

    put(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .put(url, JSON.stringify(params))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    },

    delete(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .delete(url, {params})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    },

    upload(url, file) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, file, {
                    headers: {"Content-Type": "multipart/form-data"},
                })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    },

    download(url) {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = url;
        iframe.onload = function () {
            document.body.removeChild(iframe);
        };

        document.body.appendChild(iframe);
    },
};

export default http;
