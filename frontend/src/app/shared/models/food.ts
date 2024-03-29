export class Food { 
    id!: string|number;
    name!: string;
    price!: number;
    tags?: string[];
    favorite!: boolean;
    stars!: number;
    imageUrl!: string;
    origins!: string[];
    cookTime!: string;
}