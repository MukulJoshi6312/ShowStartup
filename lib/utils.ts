import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function fromateDate(date:string){
  return new Date(date).toLocaleDateString('en-US',{
    month:'long',
    day:'numeric',
    year:'numeric',
  })
}

export function pasreServerActionResponse<T> (response :T){
  return JSON.parse(JSON.stringify(response));
}