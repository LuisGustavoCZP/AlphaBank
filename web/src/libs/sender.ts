export async function Send (url : string, json : any)
{
  try {        
    const response = await fetch(`http://localhost:8000/${url}/`, 
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