
import axios from 'axios';

export const Url = "https://hafzny.online/back/public/api/"


export  async function test (APiURL , userData , setUploadPercentage ,setDataRes)  {
    
    const options = {
        onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
            setUploadPercentage(percent);
        }
        }
    };
    try {
        await axios.post(`${Url}${APiURL}`, userData, options ,
        {
            headers: {
                'X-Request-With': 'XMLHttpRequest'
            }
        }
        ).then(res => { 
            setDataRes(res);
            setUploadPercentage(100);

            setTimeout(() => {
                setUploadPercentage(0);
            }, 1000);
    
        })
    } catch (error) {
        console.log(error); 
        throw error;
    }
};