export const dateConverted = (myDate)=>{
    return new Date(myDate).toLocaleString("en-US",{
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}