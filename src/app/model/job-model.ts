export interface Jobs{
    id:number;
    companyName: string;
    title: string,
    companyLogo: string,
    reference: string
};

export interface JobDetails{
    id: number;
    companyName: string;
    title: string;
    companyLogo: string;
    reference: string;
    location: string;
    industries: string;
    types: string;
    description:string;
    publishDate: Date;
}