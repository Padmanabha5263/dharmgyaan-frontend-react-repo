import { useState } from "react"

export const useLoader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('');
    const turnOn = (heading?: string, subHeading?: string) => {
        setIsLoading(true);
        if (heading) {
            setTitle(heading);
        }
        if (subHeading) {
            setSubTitle(subHeading)
        }
    }

    const turnOff = () => {
        setIsLoading(false);
        setTitle('');
        setSubTitle('')
    }

    return {
        turnOff,
        turnOn,
        message: {
            title,
            subTitle
        },
        isLoading
    }
}