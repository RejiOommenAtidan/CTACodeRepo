
export default function handleError(error, history) {
    //window.location.replace('/PageError500',false);  
    //window.location.href = '/PageError500';
    //window.location.replace(replaceURL);
    // window.location = "/PageError500";
    //History.pushState(null, '', '/PageError500');
    //console.log(props);
    //props.history.push(replaceURL);
    const APIErrorURL = "/PageError500";
    history.push(APIErrorURL);
    if (error.response) {
        //Out of 2** Scope
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    } else if (error.request) {
        //Client Side Issue
        console.warn(error.request);
    } else {
        //Something else Happened
        console.error('Error', error.message);
    }
    console.log(error.config);
}