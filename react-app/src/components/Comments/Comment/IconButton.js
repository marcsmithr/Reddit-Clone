// export function IconButton({icon, isActive, color, children, ...props}){
//     const parser = new DOMParser()
//     return <button className={`icon-button ${isActive ? "icon-button-active" : ""} ${color || ""}`}
//     {...props}
//     >
//         <span className={`${children != null? "mr-1": ""}`}>
//             {parser.parseFromString(icon, 'text/html')}
//         </span>
//         {children}
//     </button>
// }
