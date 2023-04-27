// const router = async () => {
//     const routes = [
//         { path: '/', view: () => console.log('dash') },
//         { path: '/posts', view: () => console.log('posts') },
//         { path: '/settings', view: () => console.log('settings') }
//     ]

//     //test each rroute for potential match
//     const potentialMatch = routes.map(route => {
//         return {
//             route: route,
//             isMatch: location.pathname === route.path
//         }
//     })

//     let match = potentialMatch.find(potentialMatch => potentialMatch.isMatch);

//     if (!match) {
//         match = {
//             route: routes[0],
//             isMatch: true,
//         }
//     }

//     console.log(potentialMatch)
// }

//document.addEventListener('DOMContentLoaded', () => router())