export const urlAPI = `${window.location.protocol}//${window.location.hostname}${window.location.port?`:8000`:''}`;
console.log(urlAPI);

export async function Send (url : string, json : any)
{
  try {        
    const response = await fetch(`${urlAPI}/${url}/`, 
    {
        method: 'POST', 
        headers: 
        {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(json)
    });

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
      console.log(error);
      return (null as unknown) as any;
  }
}
