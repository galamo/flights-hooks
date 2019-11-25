// export
// export default
// who can be exported => function, class , param, objects
// we can use export stmt many times 
// we can use default export only 1 
console.log("the export module is running...")

export const globalUserName = "Gal Amouyal"
export const defaultPicture = "https://musclecarevents.org/wp-content/uploads/2016/07/NoImageAvailable.jpg";

export const properties = { globalUserName, defaultPicture }

export default function SayHi() {
    console.log("hello")
}
