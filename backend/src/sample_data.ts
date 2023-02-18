
export const sample_foods: any[] = [
    { 
        id:1,
        name: "Idli",
        price: 9,
        cookTime:"40-50",
        favorite:false,
        stars:4.0,
        imageUrl:"assets/idli.webp",
        origins:['India', "South India"],
        tags:['Fast food','Pizza', 'Lunch']
    },
    { 
        id:2,
        name: "Dal Tadka",
        price: 9,
        cookTime:"40-50",
        favorite:false,
        stars:4.2,
        imageUrl:"assets/dal-tadka.webp",
        origins:['India', "Bihar", "UP"],
        tags:['Fast food','Pakoda', 'Breakfast']
    },
    { 
        id:3,
        name: "Aaloo Chaat",
        price: 7,
        cookTime:"20-25",
        favorite:true,
        stars:4.0,
        imageUrl:"assets/aloo-chaat.webp",
        origins:['India'],
        tags:['Fast food','Chaat','snacks','street foods']
    },
    { 
        id:4,
        name: "Vada Pav",
        price: 10,
        cookTime:"30-40",
        favorite:false,
        stars:4.0,
        imageUrl:"assets/vada-pav.webp",
        origins:['India'],
        tags:['Fast food','Vada Pav']
    },
    { 
        id:5,
        name: "Aaloo Gobi",
        price: 15,
        cookTime:"40-50",
        favorite:false,
        stars:4.5,
        imageUrl:"assets/aloo-gobi.webp",
        origins:['India'],
        tags:['Fast food','Pizza', 'Lunch']
    },
    { 
        id:6,
        name: "Buter Chicken",
        price: 20,
        cookTime:"40-50",
        favorite:false,
        stars:4.7,
        imageUrl:"assets/butter-chicken.webp",
        origins:['India'],
        tags:['Fast food','Chicken', 'Lunch']
    },
]

export const sample_tags: any[] = [
    { name: "All", count: 6 },
    { name: "FastFood", count: 4 },
    { name: "Pizza", count: 2 },
    { name: "Lunch", count: 5 },
    { name: "SlowFood", count: 6 },
    { name: "Hamburg", count: 1 },
    { name: 'Fry', count: 1 },
    {name:'Soup', count:1}
]

export const sample_users: any[] = [
    {
        email: "sshyam@gmail.com",
        password: "password",
        isAdmin: true,
        name: "Shyam Lal",
        address:"Mumbai",
    },
    {
        email: "keerthi@gmail.com",
        password: "password",
        isAdmin: false,
        name: "Keerthi",
        address:"AP",
    },
    {
        email: "priya@gmail.com",
        password: "password",
        isAdmin: false,
        name: "Priya",
        address:"UK",
    },
    {
        email: "renu@gmail.com",
        password: "password",
        isAdmin: false,
        name: "Renu",
        address:"Rajasthan",
    },
    {
        email: "aman@gmail.com",
        password: "password",
        isAdmin: false,
        name: "Aman",
        address:"Rajathan",
    },
    {
        email: "ramcharan@gmail.com",
        password: "password",
        isAdmin: false,
        name: "Ram Charan",
        address:"Chennai",
    },
]