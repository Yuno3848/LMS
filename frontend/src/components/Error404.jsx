// import { MdMusicNote } from 'react-icons/md';
// import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

// export function ErrorPage() {

//     const error = useRouteError() as Error;

//     let errorMessage: string;
//     let errorStatus = 500;

//     if (isRouteErrorResponse(error)) {
//         errorStatus = error.status;
//         errorMessage = `${error.status} - ${error.statusText || error.message}`;
//     } else if (error instanceof Error) {
//         errorMessage = error.message;
//     } else if (typeof error === 'string') {
//         errorMessage = error;
//     } else {
//         errorMessage = 'Unknown error';
//     }

//     return (
//         <div className={`block w-full h-screen overflow-hidden`}>
//             <div className="flex w-full h-full overflow-y-auto dark:bg-black dark:text-white">
//                 <div className="m-auto">
//                     <div className="flex flex-col gap-4 items-center justify-center h-screen text-center">
//                         <MdMusicNote className="text-8xl mb-4 animate-bounce" />
//                         <h1 className='text-3xl'>Oops! {errorStatus === 404 ? 'Lost your way?' : 'Internal Server Error'}</h1>
//                         <div className='text-lg'>{errorStatus === 404 ? "Sorry, we can't find that page. You'll find lots to explore on the home page." : errorMessage}</div>

//                         <Link to='/' className="btn uppercase bg-gray-200 dark:bg-white/20 text-center py-2.5 px-4 rounded-full">
//                             Go to home
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }