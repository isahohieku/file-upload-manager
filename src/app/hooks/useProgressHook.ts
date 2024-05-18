import { useEffect, useState } from "react";


export const useProgress = () => {
    const [progressCount, setProgressCount] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    console.log(progressCount)
    useEffect(() => {
        const id = setInterval(() => {
            if (progressCount >= 99) {
                return
            }
            setProgressCount(prev => prev + 1)
        }, 2000);

        setIntervalId(id)

        return () => killProgress();
    }, []);

    const killProgress = () => {
        if (intervalId) clearInterval(intervalId);
    }

    return { progressCount, killProgress }
}